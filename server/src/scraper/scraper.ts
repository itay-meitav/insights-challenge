import axios from "axios";
import cheerio from "cheerio";
import HttpProxyAgent from "http-proxy-agent";
import { checkForDuplicatesDB, pushPasteToDB } from "../database";
import * as chrono from "chrono-node";
import { IPaste } from "../models/paste.model";
import { SocksProxyAgent } from "socks-proxy-agent";

const proxy = process.env.SOCKS_PROXY || "socks5h://127.0.0.1:9050";
const endpoint =
  "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists/";
const proxyAgent = process.env.SOCKS_PROXY
  ? HttpProxyAgent(proxy)
  : new SocksProxyAgent(proxy);

export default class Scraper {
  page: number;
  constructor(page?: number) {
    this.page = page || 1;
  }

  static async scrap(page: number) {
    const scrapper = new Scraper(page);
    await scrapper.getPastes();
  }

  static async getLastPage() {
    try {
      const res = await axios(endpoint, {
        httpAgent: proxyAgent,
      });
      const $ = cheerio.load(res.data);
      const lastPageElement = $(".pages").children("a").last().attr("href");
      let lastPage = 0;
      for (let i = lastPageElement.length - 1; i >= 0; i--) {
        if (isNaN(Number(lastPageElement[i]))) {
          lastPage = parseInt(lastPageElement.substring(i + 1));
          break;
        }
      }
      return lastPage;
    } catch (error) {
      console.log("Couldn't get last page");
    }
  }

  async getHTML(link: string) {
    try {
      //Docker
      // const agent = HttpProxyAgent(proxy);
      const res = await axios(link, {
        httpAgent: proxy,
      });
      return { success: true, html: res.data };
    } catch (error) {
      console.log("failed to fetch data at page " + this.page);
      return { success: false };
    }
  }

  getLinks(html: string) {
    const $ = cheerio.load(html);
    const links = $("td.first:first-child")
      .toArray()
      .map((element) => {
        return $(element).find("a").attr("href");
      });
    console.log("done collecting links");
    return links;
  }

  async getPastes() {
    try {
      const page = (this.page - 1) * 50;
      const res = await this.getHTML(endpoint + page);
      const links = this.getLinks(res.html);
      await Promise.all(
        links.map(async (link) => {
          const res = await this.getHTML(link);
          const paste = this.scrapPaste(res.html);
          await this.checkAndUploadToDB(paste);
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  scrapPaste(html: string) {
    const $ = cheerio.load(html);
    const paste: IPaste = {
      content: this.getContent($),
      title: this.getTitle($),
      author: this.getAuthor($),
      date: this.getDate($),
    };
    return paste;
  }

  getContent($: cheerio.Root) {
    let content = $("#code").text();
    return content;
  }

  getTitle($: cheerio.Root) {
    let title = $("h1.pagetitle").text();
    return title;
  }

  getDate($: cheerio.Root) {
    let line = $("span.by").text();
    const dateString = line
      .split(", ")
      .slice(1)
      .find((x) => x.includes(" ago"));
    const date = chrono.parseDate(dateString) || new Date();
    return date;
  }

  getAuthor($: cheerio.Root) {
    let line = $("span.by").text();
    const author = line.replace("From ", "").split(", ")[0];
    return author;
  }

  async checkAndUploadToDB(paste: IPaste) {
    const test = await checkForDuplicatesDB(paste.title, paste.content);
    if (test) {
      return false;
    }
    const fixedPaste: IPaste = Object.fromEntries(
      Object.entries(paste).map(([k, v]) => {
        if (k == "date") {
          return [k, paste.date];
        }
        return [k, removeInitialNonAlphabeticChars(v)];
      })
    );
    if (fixedPaste.title && fixedPaste.content) {
      return await pushPasteToDB(fixedPaste);
    }
    return false;
  }
}

function removeInitialNonAlphabeticChars(string: string) {
  let i = 0;
  while (i < string.length && !string[i].match(/[a-zA-Z]/)) {
    i += 1;
  }
  return string.substring(i);
}

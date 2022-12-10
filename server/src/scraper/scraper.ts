import axios from "axios";
import cheerio from "cheerio";
import HttpProxyAgent from "http-proxy-agent";
import { checkForDuplicatesDB, pushPasteToDB } from "../database";
import * as chrono from "chrono-node";
import { IPaste } from "../models/paste.model";

// HTTP/HTTPS proxy to connect to
const proxy = "http://tor:8118";
const url =
  "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists/";

export default class Scraper {
  page: number;
  constructor(page?: number) {
    this.page = page || 1;
  }

  static async scrap(page: number) {
    const scrapper = new Scraper(page);
    await scrapper.getPastes();
  }

  async getHTML(link: string) {
    try {
      const agent = HttpProxyAgent(proxy);
      const res = await axios(link, {
        httpAgent: agent,
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
      const res = await this.getHTML(url + page);
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
    const fixing: IPaste = Object.assign(
      {},
      ...Object.entries(paste).map(([k, v]) => {
        if (k == "date") {
          return { [k]: paste.date };
        }
        return { [k]: removeInitialNonAlphabeticChars(v) };
      })
    );
    if (fixing.title && fixing.content) {
      return await pushPasteToDB(fixing);
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

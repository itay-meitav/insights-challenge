import axios from "axios";
import cheerio from "cheerio";
import HttpProxyAgent from "http-proxy-agent";
import { checkForDuplicatesDB, pushDataToDB } from "../database";
import * as chrono from "chrono-node";
import { IPaste } from "../models/paste.model";

// HTTP/HTTPS proxy to connect to
const proxy = process.env.HTTP_PROXY || "http://127.0.0.1:8118";
const url =
  "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists/";

export default class Scraper {
  constructor(public page: number) {}

  static async scrap(page: number = 1) {
    const scrapper = new Scraper(page);
    const posts = await scrapper.getPosts();
    return posts;
  }

  async getHTML(link: string) {
    try {
      const agent = HttpProxyAgent(proxy);
      // console.log("using proxy server", proxy);
      // console.log("attempting to GET", link);
      const res = await axios(link, {
        httpAgent: agent,
      });
      return { success: true, html: res.data };
    } catch (error) {
      console.log(error);

      console.log("failed to fetch data at page " + this.page);
      // console.log(error);
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

  async getPosts() {
    const page = (this.page - 1) * 50;
    const res = await this.getHTML(url + page);
    if (res.success) {
      const links = this.getLinks(res.html);
      const posts = await Promise.all(
        links.map(async (link): Promise<IPaste> => {
          const res = await this.getHTML(link);
          if (!res.success) return {} as IPaste;
          const post = this.scrapPost(res.html);
          this.checkAndUploadToDB(post);
          return post as IPaste;
        })
      );
      return posts.filter((x) => x.content);
    }
    return [] as IPaste[];
  }

  scrapPost(html: string) {
    const $ = cheerio.load(html);
    const post: IPaste = {
      content: this.getContent($),
      title: this.getTitle($),
      author: this.getAuthor($),
      date: this.getDate($),
    };
    return post;
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

  removeDuplicates(posts: IPaste[]) {
    const filteredPosts = posts.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.title.toLowerCase() === value.title.toLowerCase() &&
            t.content.toLowerCase() === value.content.toLowerCase()
        )
    );
    return filteredPosts;
  }

  async savePostsInDB(posts: IPaste[]) {
    await pushDataToDB(posts);
  }

  async checkAndUploadToDB(post: IPaste) {
    const test = await checkForDuplicatesDB(post.title, post.content);
    if (!test) {
      this.savePostsInDB([post]);
    }
    return false;
  }
}

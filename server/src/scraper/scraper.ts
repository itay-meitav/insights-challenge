import axios from "axios";
import cheerio from "cheerio";
import HttpProxyAgent from "http-proxy-agent";
import { pushDataToDB } from "../DB";
import * as chrono from "chrono-node";

// HTTP/HTTPS proxy to connect to
const proxy = process.env.http_proxy || "http://localhost:8118";
const url =
  "http://paste2vljvhmwq5zy33re2hzu4fisgqsohufgbljqomib2brzx3q4mid.onion/lists/";

type TPost = {
  content: string;
  author: string;
  title: string;
  date: Date;
};

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

  async getPosts() {
    const page = (this.page - 1) * 50;
    const res = await this.getHTML(url + page);
    if (res.success) {
      const links = this.getLinks(res.html);
      const posts = await Promise.all(
        links.map(async (link) => {
          const res = await this.getHTML(link);
          if (!res.success) return {};
          const post = this.scrapPost(res.html);
          this.savePost([post]);
          return post;
        })
      );
      return posts;
    }
  }

  scrapPost(html: string) {
    const $ = cheerio.load(html);
    const post: TPost = {
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

  savePost(posts: TPost[]) {
    pushDataToDB(posts);
  }
}

// posts.filter(
//     (value, index, self) =>
//       index ===
//       self.findIndex(
//         (t) =>
//           t.title.toLowerCase() === value.title.toLowerCase() &&
//           t.content.toLowerCase() === value.content.toLowerCase()
//       )
//   );

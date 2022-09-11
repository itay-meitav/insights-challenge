var url = require("url");
var http = require("http");
import fs from "fs/promises";
const axios = require("axios");
const cheerio = require("cheerio");
var HttpProxyAgent = require("http-proxy-agent");
import { pushDataToDB } from "../DB";

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || "http://localhost:8118";

// HTTP endpoint for the proxy to connect to
var endpoint =
  "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all";

var opts = url.parse(endpoint);

// create an instance of the `HttpProxyAgent` class with the proxy server information
var agent = new HttpProxyAgent(proxy);

opts.agent = agent;

export async function createScrapedFile() {
  let posts = [];
  // console.log("using proxy server", proxy);
  // console.log("attempting to GET", endpoint);
  // await axios(endpoint, {
  //   httpAgent: agent,
  // })
  const res = await fs.readFile(__dirname + "/data.html", "utf8");
  const $ = await cheerio.load(res); //.data
  $("h4").each(function (i: number) {
    posts.push({});
    posts[i].title = $(this).text().trim();
  });
  $("div.text").each(function (i: number) {
    posts[i].content = $(this).text().trim();
  });
  $(".col-sm-6:first-child", ".row").each(function (i: number) {
    posts[i].info = $(this).text().trim();
  });
  console.log("preparing the file");
  posts = posts.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.title.toLowerCase() === value.title.toLowerCase() &&
          t.content.toLowerCase() === value.content.toLowerCase()
      )
  );
  for (let i = 0; i < posts.length; i++) {
    posts[i].id = i;
  }

  await fs.writeFile(`${__dirname}/data.json`, JSON.stringify(posts));
  // .then(async () => {
  console.log("pushing the data to DB");
  await pushDataToDB();
  console.log("done");

  // })
}
// setInterval(() => createScrapedFile("./src/scraper/"), 120 * 1000);
// createScrapedFile();

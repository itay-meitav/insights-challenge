var url = require("url");
var http = require("http");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
var HttpProxyAgent = require("http-proxy-agent");
import { pushDataToDB } from "src/DB";

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || "http://localhost:8118";

// HTTP endpoint for the proxy to connect to
var endpoint =
  "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all";

var opts = url.parse(endpoint);

// create an instance of the `HttpProxyAgent` class with the proxy server information
var agent = new HttpProxyAgent(proxy);

opts.agent = agent;

export async function createScrapedFile(location: string) {
  let test = [];
  console.log("using proxy server", proxy);
  console.log("attempting to GET", endpoint);
  await axios(endpoint, {
    httpAgent: agent,
  })
    .then(async (res) => {
      const $ = await cheerio.load(res.data);
      $("h4").each(function (i: number) {
        test.push({});
        test[i].title = $(this).text().trim();
      });
      $("div.text").each(function (i: number) {
        test[i].content = $(this).text().trim();
      });
      $(".col-sm-6:first-child", ".row").each(function (i: number) {
        test[i].info = $(this).text().trim();
      });
      console.log("preparing the file");
      test = test.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.title.toLowerCase() === value.title.toLowerCase() &&
              t.content.toLowerCase() === value.content.toLowerCase()
          )
      );
      for (let i = 0; i < test.length; i++) {
        test[i].id = i;
      }
    })
    .then(async () => {
      await fs.writeFileSync(`${location}data.json`, JSON.stringify(test));
    })
    .then(async () => {
      console.log("pushing the data to DB");
      await pushDataToDB();
      console.log("done");
    })
    .catch(() => {
      console.log("something went wrong");
    });
}

setInterval(() => createScrapedFile("./src/scraper/"), 120 * 1000);

var url = require("url");
var http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");

var HttpProxyAgent = require("http-proxy-agent");

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || "http://localhost:8118";
console.log("using proxy server", proxy);

// HTTP endpoint for the proxy to connect to
var endpoint =
  "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all";
console.log("attempting to GET", endpoint);
var opts = url.parse(endpoint);

// create an instance of the `HttpProxyAgent` class with the proxy server information
var agent = new HttpProxyAgent(proxy);
const axios = require("axios");
opts.agent = agent;

const data = async () => {
  return await axios(endpoint, {
    httpAgent: agent,
  }).then((res) => {
    return res.data;
  });
};

data().then((data) => {
  fs.writeFileSync("./index.html", data);
  //   const $ = cheerio.load(data);
  //   const posts = $("div.text");
  //   console.log(posts.text());
});

import * as fs from "fs";
import * as cheerio from "cheerio";

function createScrapedFile() {
  const data = fs.readFileSync("./index.html", "utf8");
  const $ = cheerio.load(data);
  let test = [];
  $("h4").each(function (i) {
    test.push({});
    test[i].title = $(this).text().trim();
  });
  $("div.text").each(function (i) {
    test[i].content = $(this).text().trim();
  });
  $(".col-sm-6:first-child", ".row").each(function (i) {
    test[i].info = $(this).text().trim();
  });

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
  fs.writeFileSync("./data.json", JSON.stringify(test));
  console.log("done");
}
createScrapedFile();

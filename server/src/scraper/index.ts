import Scraper from "./scraper";

async function scrapAll() {
  for (let i = 50; i > 0; i--) {
    const j = i - 1;
    await Promise.all([
      Scraper.scrap(i).then(
        (posts) => {
          console.log("finished scrapping page " + i);
        },
        (err) => {
          console.log("error scrapping page " + i);
        }
      ),
      Scraper.scrap(j).then(
        (posts) => {
          console.log("finished scrapping page " + j);
        },
        (err) => {
          console.log("error scrapping page " + j);
        }
      ),
    ]);
    i--;
  }
  console.log("done");
}
scrapAll();

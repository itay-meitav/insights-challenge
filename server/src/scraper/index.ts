import { getKeywords, getLastDBItem, pushAlert } from "../database/index";
import * as chrono from "chrono-node";
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

export async function scrapLastPage() {
  const keywords = await getKeywords();
  try {
    const lastDBItem = await getLastDBItem();
    let page = 1;
    let posts: any = [];
    let j = 0;
    while (
      page < 2 &&
      !posts.find(
        (x) => x.title === lastDBItem.title && x.content === lastDBItem.content
      )
    ) {
      posts = await Scraper.scrap(page);
      if (j < 1 && posts.some((x) => keywords.includes(x))) {
        await pushAlert({
          alert: "New Posts with your keywords have been found",
          date: chrono.parseDate("now"),
        });
        j++;
      }
      page++;
    }
    await pushAlert({
      alert: "Data collection completed successfully",
      date: chrono.parseDate("now"),
    });
    return true;
  } catch (error) {
    console.log("error scrapping page");
    await pushAlert({
      alert: "Data collection has failed",
      date: chrono.parseDate("now"),
    });
    return false;
  }
}

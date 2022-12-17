import { getTags, getLastDBItem, pushAlert } from "../database/index";
import * as chrono from "chrono-node";
import Scraper from "./scraper";

export async function scrapAll() {
  const lastPage = await Scraper.getLastPage();
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
// scrapAll();

export async function scrapLastPage() {
  const tags = await getTags();
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
      if (j < 1 && posts.some((x) => tags.includes(x))) {
        await pushAlert({
          alert: "New Pastes with your tags have been found",
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

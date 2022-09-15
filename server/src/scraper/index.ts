import { getLastDBItem } from "../DB/index";
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
  try {
    const lastDBItem = await getLastDBItem();
    let page = 1;
    let posts: any = [];
    while (
      page < 2 &&
      !posts.find(
        (x) => x.title === lastDBItem.title && x.content === lastDBItem.content
      )
    ) {
      posts = await Scraper.scrap(page);
      page++;
    }
    return true;
  } catch (error) {
    console.log("error scrapping page");
    return false;
  }
}

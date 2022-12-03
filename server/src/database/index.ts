import { connection } from "mongoose";
import { IPaste, Paste } from "../models/paste.model";
import { Keyword, IKeyword } from "../models/keyword.model";
import { Alert, IAlert } from "../models/alerts.model";

const db = connection;
db.on("error", (err) => {
  console.log(err);
});

export async function pushDataToDB(posts: IPaste[]) {
  try {
    await Paste.insertMany(posts);
    // console.log(`Inserted ${posts.length} documents to DB`);
  } catch (error) {
    console.log("error inserting data to DB");
  }
}

export async function getPastesHeading() {
  try {
    return await Paste.find({}, { projection: { title: 1, _id: 0 } });
  } catch (error) {
    console.log(error);
  }
}

export async function checkForDuplicatesDB(title: string, content: string) {
  try {
    const findResult = await Paste.count({
      title,
      content,
    });
    if (findResult > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

export async function getPastes(
  limit: number,
  offset: number,
  sortBy: string,
  searchKey?: string,
  keywords?: boolean
) {
  try {
    const keywordsList = await getKeywords();
    const searchParam = {};
    if (searchKey && keywords) {
      searchParam["title"] = {
        $regex: new RegExp(searchKey + "|" + keywordsList.join("|"), "i"),
      };
    } else if (searchKey && !keywords) {
      searchParam["title"] = {
        $regex: new RegExp(searchKey, "i"),
      };
    } else if (!searchKey && keywords) {
      searchParam["title"] = {
        $regex: new RegExp(keywordsList.join("|"), "i"),
      };
    }
    const res = await Paste.find(searchParam)
      .sort([[sortBy, -1]])
      .skip(offset)
      .limit(limit);
    const count = await Paste.count(searchParam);
    return { documents: res, count: count };
  } catch (error) {
    console.log(error);
  }
}

export async function getLastDBItem() {
  try {
    const last = await Paste.find().sort({ date: -1 }).limit(1);
    return last[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getKeywords() {
  try {
    const keywordsArr = await Keyword.find({});
    return keywordsArr.map((x) => x.keyword);
  } catch (error) {
    console.log(error);
  }
}

export async function pushKeywords(arr: IKeyword[]) {
  try {
    await dropC("keywords").then(() => {
      Keyword.insertMany(arr);
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getAlerts(
  limit: number,
  offset: number,
  orderBy: 1 | -1
) {
  try {
    const res = await Alert.find({})
      .sort([["date", orderBy]])
      .skip(offset)
      .limit(limit);
    const count = await Alert.count({});
    return { documents: res, count: count };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getLastAlert() {
  try {
    const last = await Alert.find().sort({ date: -1 }).limit(1);
    return last[0];
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function pushAlert(alert: IAlert) {
  try {
    await Alert.create(alert);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function dropC(collection: string) {
  try {
    await db.dropCollection(collection);
    console.log(`${collection} collection dropped`);
  } catch (error) {
    console.error(`error deleting ${collection} collection`);
  }
}

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
  const findResult = await Paste.find({}, { projection: { title: 1, _id: 0 } });

  console.log("Search options have been sent from DB");
  return findResult;
}

export async function checkForDuplicatesDB(title: string, content: string) {
  const findResult = await Paste.count({
    title,
    content,
  });
  if (findResult > 0) {
    return true;
  }
  return false;
}

export async function getPastes(
  limit: number,
  offset: number,
  sortBy: string,
  searchKey?: string,
  keywords?: string
) {
  const findOptions: any = {};
  const findKeywords: any = {};

  function findDoc() {
    if (searchKey) return findOptions;
    if (keywords) return findKeywords;
    if (!searchKey && !keywords) return {};
  }

  if (searchKey) {
    findOptions.title = {
      $regex: new RegExp(searchKey, "i"),
    };
  }

  if (keywords) {
    const keywords = await getKeywords();
    let regex = keywords.join("|");
    findKeywords.title = {
      $regex: new RegExp(regex, "i"),
    };
  }

  const res = await Paste.find(findDoc())
    .sort([[sortBy, -1]])
    .skip(offset)
    .limit(limit);

  const count = Paste.countDocuments(findDoc());
  console.log("posts results have been sent from DB");
  return { documents: res, count: count };
}

export async function getLastDBItem() {
  const last = await Paste.find().sort({ date: -1 }).limit(1);
  return last[0];
}

export async function getKeywords() {
  const keywordsArr = await Keyword.find({});
  return keywordsArr.map((x) => x.keyword);
}

export async function pushKeywords(arr: IKeyword[]) {
  if (arr.length)
    await dropC("keywords").then(() => {
      Keyword.insertMany(arr);
    });
  else {
    console.log("array is empty");
  }
}

export async function getAlerts(
  limit: number,
  offset: number,
  orderBy: 1 | -1
) {
  const res = await Alert.find({})
    .sort([["date", orderBy]])
    .skip(offset)
    .limit(limit);
  const count = Alert.countDocuments({});
  console.log("alerts results have been sent from DB");
  return { documents: res, count: count };
}

export async function getLastAlert() {
  const last = await Alert.find().sort({ date: -1 }).limit(1);
  return last[0];
}

export async function pushAlert(alert: IAlert) {
  if (alert) Alert.create(alert);
  else {
    console.log("alert is empty");
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

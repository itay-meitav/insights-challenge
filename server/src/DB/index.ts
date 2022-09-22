import { Document, Filter, MongoClient } from "mongodb";
const HOST = process.env.MONGO_HOST;
// Connection URL
const url = `mongodb://${HOST || "127.0.0.1"}:27017`;
const client = new MongoClient(url);
// Database Name
const dbName = "insights";
const db = client.db(dbName);
const insights = db.collection("insights");
const keywords = db.collection("keywords");
const alerts = db.collection("alerts");
connectDB();
init();

function init() {
  insights.createIndex({ title: "text" });
  // drop();
}

export async function dropC(collection: string) {
  try {
    // await connection;
    await db.dropCollection(collection);
    console.log(`${collection} collection dropped`);
  } catch (error) {
    console.error(`error deleting ${collection} collection`);
  }
}

export async function pushDataToDB(posts: any[]) {
  try {
    await insights.insertMany(posts, {
      maxTimeMS: 99999,
    });
    // console.log(`Inserted ${posts.length} documents to DB`);
  } catch (error) {
    console.log("error inserting data to DB");
  }
}

export async function getPostsHeading() {
  const findResult = await insights
    .find({}, { projection: { title: 1, _id: 0 } })
    .toArray();

  console.log("Search options have been sent from DB");
  return findResult;
}

export async function checkForDuplicatesDB(title: string, content: string) {
  const findResult = await insights.count({
    title,
    content,
  });
  if (findResult > 0) {
    return true;
  }
  return false;
}

export async function getPosts(
  limit: number,
  offset: number,
  sortBy: string,
  searchKey?: string,
  keywords?: string
) {
  const findOptions: Filter<Document> = {};
  const findKeywords: Filter<Document> = {};

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

  const res = await insights
    .find(findDoc())
    .sort(sortBy, -1)
    .skip(offset)
    .limit(limit)
    .toArray();

  const count = insights.countDocuments(findDoc());
  console.log("posts results have been sent from DB");
  return { documents: res, count: count };
}

export async function getLastDBItem() {
  const last = await insights.find().sort({ date: -1 }).limit(1).toArray();
  return last[0];
}

export async function getKeywords() {
  const keywordsArr = await keywords.find({}).toArray();
  return keywordsArr.map((x) => x.keyword);
}

export async function pushKeywords(arr: any[]) {
  if (arr.length)
    await dropC("keywords").then(() => {
      keywords.insertMany(arr, {
        maxTimeMS: 99999,
      });
    });
  else {
    console.log("array is empty");
  }
}

export async function getAlerts(limit: number, offset: number, sortBy: string) {
  const res = await alerts
    .find({})
    .sort(sortBy, -1)
    .skip(offset)
    .limit(limit)
    .toArray();

  const count = alerts.countDocuments({});
  console.log("alerts results have been sent from DB");
  return { documents: res, count: count };
}

export async function pushAlert(alert: { alert: string; date: string }) {
  if (alert)
    alerts.insertOne(alert, {
      maxTimeMS: 99999,
    });
  else {
    console.log("alert is empty");
  }
}

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to db");
  } catch {
    console.log("Couldn't connect to db");
  }
}

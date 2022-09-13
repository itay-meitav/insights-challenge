import { MongoClient } from "mongodb";
const HOST = process.env.MONGO_HOST;
// Connection URL
const url = `mongodb://${HOST || "127.0.0.1"}:27017`;
const client = new MongoClient(url);
// Database Name
const dbName = "insights";
const db = client.db(dbName);
const insights = db.collection("insights");
connectDB();
init();

function init() {
  insights.createIndex({ title: "text" });
  // drop();
}

export async function drop() {
  try {
    // await connection;
    await db.dropCollection("insights");
    console.log("collection dropped");
  } catch (error) {
    console.error("error deleting collection");
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

export async function getPosts(limit: number, offset: number, sortBy: string) {
  const res = await insights
    .find({})
    .sort(sortBy, -1)
    .skip(offset)
    .limit(limit)
    .toArray();
  console.log("Search results have been sent from DB");
  return res;
}

export async function getSearchPost(
  limit: number,
  offset: number,
  sortBy: string,
  searchKey: string
) {
  const res = await insights
    .find({
      title: {
        $regex: new RegExp(searchKey, "i"),
      },
    })
    .sort(sortBy, -1)
    .skip(offset)
    .limit(limit)
    .toArray();
  console.log("Search results have been sent from DB");
  return res;
}

export async function countDocs() {
  const count = await insights.countDocuments({});
  return count;
}

export async function disconnectDB() {
  try {
    await client.close();
    console.log("disconnected successfully from db");
  } catch {
    console.log("Couldn't disconnected from db");
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

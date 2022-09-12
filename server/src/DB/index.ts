import { MongoClient } from "mongodb";
const data = require("../scraper/data.json");
import fs from "fs/promises";
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
async function drop() {
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
    const insertResult = await insights.insertMany(posts, {
      maxTimeMS: 99999,
    });
    // console.log(`Inserted ${posts.length} documents to DB`);
  } catch (error) {
    console.log("error inserting data to DB");
  }
}

export async function getItems() {
  const findResult = await insights.find({}).toArray();
  console.log("database's content has been sent from DB");
  return findResult;
}
export async function getItemsHeading() {
  const findResult = await insights
    .find({}, { projection: { title: 1, _id: 0 } })
    .toArray();

  console.log("Search options have been sent from DB");
  return findResult;
}

export async function searchKey(key: string) {
  const res = await insights
    .find({
      title: {
        $regex: new RegExp(key, "i"),
      },
    })
    .toArray();
  console.log("Search results have been sent from DB");

  return res;
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

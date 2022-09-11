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
const connection = connectDB();

export async function pushDataToDB() {
  // Use connect method to connect to the server
  console.log("inserting");

  try {
    // await connection;
    await db.dropCollection("insights");
    console.log("collection dropped");
  } catch (error) {
    console.error("error deleting collection");
  }
  try {
    const insertResult = await insights.insertMany(data, {
      maxTimeMS: 99999,
    });
    console.log("Inserted documents to DB");
  } catch (error) {
    console.log("error inserting data to DB");
  }
}

// pushDataToDB();

export async function getItems() {
  // await connectDB();
  const findResult = await insights.find({}).toArray();
  console.log("database's content has been sent from DB");
  return findResult;
}
export async function getItemsHeading() {
  // await connectDB();
  const findResult = await insights
    .find({}, { projection: { title: 1, _id: 0 } })
    .toArray();

  console.log("Search options have been sent from DB");
  return findResult;
}

export async function searchKey(key: string) {
  const search = [];
  const data = await fs.readFile(__dirname + "/../scraper/data.json", "utf8");
  const parsedData = await JSON.parse(data);
  console.log(key);
  for (let i = 0; i < parsedData.length; i++) {
    const post = parsedData[i].title.toLowerCase();
    if (post.includes(key)) {
      search.push(parsedData[i]);
    }
  }
  console.log("Search results have been sent from DB");
  return search;
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
//   const DBlocation = "/data/db";
//   const dirName = require("path").dirname(DBlocation);
//   if (!fs.existsSync(dirName)) {
//     fs.mkdirSync(dirName, { recursive: true });
//   }

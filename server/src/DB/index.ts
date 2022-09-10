const { MongoClient } = require("mongodb");
const fs = require("fs");
const data = require("./scraper/data.json");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
// Database Name
const dbName = "insights";
const db = client.db(dbName);
const collection = db.collection("insights");

export async function pushDataToDB() {
  //   const DBlocation = "/data/db";
  //   const dirName = require("path").dirname(DBlocation);
  //   if (!fs.existsSync(dirName)) {
  //     fs.mkdirSync(dirName, { recursive: true });
  //   }
  // Use connect method to connect to the server
  await connectDB();
  await collection.drop();
  const insertResult = await collection.insertMany(JSON.parse(data), {
    maxTimeMS: 99999,
  });
  console.log("Inserted documents =>", insertResult);
}

export async function getItems() {
  await connectDB();
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  return findResult;
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
// pushDataToDB();

require("dotenv").config({ path: __dirname + "/../../.env" });
import mongoose from "mongoose";

// Connects to the database
export async function dbConnection(): Promise<void> {
  const url = process.env.MONGO;
  try {
    await mongoose.connect(url);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}

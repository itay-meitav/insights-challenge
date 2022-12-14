import mongoose from "mongoose";

// Connects to the database
export async function dbConnection(): Promise<void> {
  const url = "mongodb://mongo:27017/insights";
  try {
    await mongoose.connect(url);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}

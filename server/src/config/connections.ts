import mongoose from "mongoose";

// Connects to the database
export async function dbConnection(): Promise<void> {
  const url = "mongodb+srv://itay234:abc12345@cluster0.one6i.mongodb.net/test";
  try {
    await mongoose.connect(url);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
}

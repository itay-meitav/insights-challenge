import mongoose from "mongoose";

// Connects to the database
export async function dbConnection(): Promise<void> {
  const HOST = process.env.MONGO_HOST;
  const url =
    process.env.NODE_ENV == "production"
      ? process.env.DATABASE_URL
      : `mongodb://${HOST || "127.0.0.1"}:27017/insights`;
  try {
    await mongoose.connect(url);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
}

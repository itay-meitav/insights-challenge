require("dotenv").config();
import express from "express";
import cors from "cors";
import apiRoute from "./routes/api.route";
// import { createServer } from "http";
// import { Server } from "socket.io";
import { dbConnection } from "./config/connections";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use("/api", apiRoute);

const port = process.env.PORT || 5000;

(async (): Promise<void> => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
})();

//This will output unhandled Rejection
process.on("unhandledRejection", (error: Error, promise) => {
  console.log(`unhandled Rejection: ${error} \n ErrorStack: ${error.stack}`);
});

//This will output unhandled Exception
process.on("uncaughtException", (error: Error, promise) => {
  console.log(`uncaught Exception: ${error} \n ErrorStack: ${error.stack}`);
});

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

dbConnection();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

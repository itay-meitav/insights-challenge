if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import { createScrapedFile } from "./scraper/code";
const data = require("./scraper/data.json");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/posts", (req, res) => {
  res.json(data);
});

app.post("/reload", async (req, res) => {
  await createScrapedFile("./src/scraper/");
  res.json({ success: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

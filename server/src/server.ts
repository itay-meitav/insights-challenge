if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import { createScrapedFile } from "./scraper/code";
import { getItems } from "./DB";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get("/posts", async (req, res) => {
  const data = await getItems();
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

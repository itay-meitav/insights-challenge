if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import { countDocsDB, getPostsHeading, getPosts, searchKey } from "./DB";

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
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const search = (req.query.search as string) || undefined;
  const count = await countDocsDB();
  const posts = await getPosts(limit, offset);
  const pages = Math.ceil(count / limit);
  const searchFromDB = await searchKey(limit, offset, search);
  res.json({
    posts,
    pages,
    searchFromDB,
    success: true,
  });
});

app.get("/search-options", async (req, res) => {
  const data = await getPostsHeading();
  res.json(data);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import { countDocs, getPostsHeading, getPosts, getSearchPost } from "./DB";

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
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : "date";
  const count = await countDocs();
  const pages = Math.ceil(count / limit);
  const posts = await getPosts(limit, offset, orderBy);
  const searchFromDB = await getSearchPost(limit, offset, orderBy, search);
  console.log(count);

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

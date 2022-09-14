if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import { getPostsHeading, getPosts } from "./DB";

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

  const postsReq = search
    ? await getPosts(limit, offset, orderBy, search)
    : await getPosts(limit, offset, orderBy);
  const posts = postsReq.posts;
  const count = await postsReq.count;
  const pages = Math.ceil(count / limit);
  res.json({
    posts,
    pages,
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

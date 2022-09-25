if (process.env.MODE_ENV != "production") {
  require("dotenv").config();
}
import express from "express";
import cors from "cors";
import {
  getPostsHeading,
  getPosts,
  getKeywords,
  pushKeywords,
  pushAlert,
  getAlerts,
  getLastAlert,
} from "./DB";
import { scrapLastPage } from "./scraper";

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
  const keywords = (req.query.keywords as string) || undefined;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : "date";

  if (search) {
    const postsReq = await getPosts(limit, offset, orderBy, search);
    await answerFromServer(postsReq, limit, res);
  } else if (keywords) {
    const postsReq = await getPosts(
      limit,
      offset,
      orderBy,
      undefined,
      keywords
    );
    await answerFromServer(postsReq, limit, res);
  } else {
    const postsReq = await getPosts(limit, offset, orderBy);
    await answerFromServer(postsReq, limit, res);
  }
});

app.get("/new", async (req, res) => {
  return await scrapLastPage().then((result) => {
    return res.json({
      success: result,
    });
  });
});

app.get("/search-options", async (req, res) => {
  const data = await getPostsHeading();
  res.json(data);
});

app.get("/keywords", async (req, res) => {
  const data = await getKeywords();
  res.json(data);
});

app.post("/keywords", async (req, res) => {
  try {
    const data = req.body;
    await pushKeywords(data);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

app.get("/alerts", async (req, res) => {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const orderBy = req.query.orderBy as string;
  const data = await getAlerts(limit, offset, parseInt(orderBy) > 0 ? 1 : -1);
  await answerFromServer(data, limit, res);
});

app.get("/alerts/last", async (req, res) => {
  const last = await getLastAlert();
  res.json(last);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

async function answerFromServer(postsReq: any, limit: number, res: any) {
  const documents = postsReq.documents;
  const count = await postsReq.count;
  const pages = Math.ceil(count / limit);
  res.json({
    documents,
    pages,
    success: true,
  });
}

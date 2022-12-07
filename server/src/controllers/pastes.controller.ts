import { Request, Response } from "express";
import { getPastes as getPastesFromDB } from "../database";
import { scrapLastPage } from "../scraper";

export async function getPastes(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const search = req.query.search as string;
  const keywords = Boolean(req.query.keywords) || false;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : "date";
  const postsReq = await getPastesFromDB(
    limit,
    offset,
    orderBy,
    search,
    keywords
  );
  if (postsReq) {
    return res.json({
      documents: postsReq.documents,
      count: postsReq.count,
      success: true,
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
}
export async function getNewPastes(req: Request, res: Response) {
  const lastPage = await scrapLastPage();
  if (lastPage) {
    return res.json({
      documents: lastPage,
      success: true,
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
}

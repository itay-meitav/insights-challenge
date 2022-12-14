import { Request, Response } from "express";
import { getPastes as getPastesFromDB } from "../database";
import { scrapLastPage } from "../scraper";

export async function getPastes(req: Request, res: Response) {
  const page = req.query.page || 1;
  const sort = req.query.sort || "date";
  const order = req.query.order || -1;
  const search = req.query.search || "";
  const tags = req.query.tags || false;
  const postsReq = await getPastesFromDB(page, sort, order, search, tags);
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

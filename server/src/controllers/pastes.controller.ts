import { Request, Response } from "express";
import { getPastes as getPastesFromDB } from "../database";
import { scrapLastPage } from "../scraper";

export async function getPastes(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const search = (req.query.search as string) || undefined;
  const keywords = (req.query.keywords as string) || undefined;
  const orderBy = req.query.orderBy
    ? (req.query.orderBy + "")?.split(" ")[0].replaceAll("-", "")
    : "date";
  if (search) {
    const postsReq = await getPastesFromDB(limit, offset, orderBy, search);
    const documents = postsReq.documents;
    const count = await postsReq.count;
    const pages = Math.ceil(count / limit);
    res.json({
      documents,
      pages,
      success: true,
    });
  } else if (keywords) {
    const postsReq = await getPastesFromDB(
      limit,
      offset,
      orderBy,
      undefined,
      keywords
    );
    const documents = postsReq.documents;
    const count = await postsReq.count;
    const pages = Math.ceil(count / limit);
    res.json({
      documents,
      pages,
      success: true,
    });
  } else {
    const postsReq = await getPastesFromDB(limit, offset, orderBy);
    const documents = postsReq.documents;
    const count = await postsReq.count;
    const pages = Math.ceil(count / limit);
    res.json({
      documents,
      pages,
      success: true,
    });
  }
}

export async function getNewPastes(req: Request, res: Response) {
  return await scrapLastPage().then((result) => {
    return res.json({
      success: result,
    });
  });
}

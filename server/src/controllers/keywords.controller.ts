import { Request, Response } from "express";
import {
  getKeywords as getKeywordsDB,
  pushKeywords as pushKeywordsDB,
} from "../database";

export async function getKeywords(req: Request, res: Response) {
  const data = await getKeywordsDB();
  res.json(data);
}

export async function pushKeywords(req: Request, res: Response) {
  try {
    const data = req.body;
    await pushKeywordsDB(data);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
}

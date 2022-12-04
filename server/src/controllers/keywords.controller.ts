import { Request, Response } from "express";
import {
  getKeywords as getKeywordsDB,
  pushKeywords as pushKeywordsDB,
} from "../database";

export async function getKeywords(req: Request, res: Response) {
  const data = await getKeywordsDB();
  if (data) {
    return res.json({
      documents: data,
      success: true,
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
}

export async function pushKeywords(req: Request, res: Response) {
  if (req.body.keywords.length) {
    const data = await pushKeywordsDB(req.body);
    if (data) {
      return res.json({ success: true });
    }
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
  res.status(400).json({
    message: "Please enter keywords list",
    success: false,
  });
}

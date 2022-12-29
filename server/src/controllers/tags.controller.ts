import { Request, Response } from "express";
import { getTags as getTagsDB, pushTags as pushTagsDB } from "../database";

export async function getTags(req: Request, res: Response) {
  const data = await getTagsDB();
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

export async function pushTags(req: Request, res: Response) {
  if (req.body.tags) {
    const data = await pushTagsDB(req.body.tags);
    if (data) {
      return res.json({ success: true });
    }
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
  res.status(400).json({
    message: "Please enter at least one tag",
    success: false,
  });
}

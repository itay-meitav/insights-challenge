import { Request, Response } from "express";
import { getPastesHeading } from "../database";

export async function searchOptions(req: Request, res: Response) {
  const data = await getPastesHeading();
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

import { Request, Response } from "express";
import { getPastesHeading } from "../database";

export async function searchOptions(req: Request, res: Response) {
  const data = await getPastesHeading();
  res.json(data);
}

import { Request, Response } from "express";
import {
  getAlerts as getAlertsDB,
  getLastAlert as getLastAlertDB,
} from "../database";

export async function getAlerts(req: Request, res: Response) {
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const orderBy = req.query.orderBy as string;
  const data = await getAlertsDB(limit, offset, parseInt(orderBy) > 0 ? 1 : -1);
  const documents = data.documents;
  const count = await data.count;
  const pages = Math.ceil(count / limit);
  res.json({
    documents,
    pages,
    success: true,
  });
}

export async function getLastAlert(req: Request, res: Response) {
  const last = await getLastAlertDB();
  res.json(last);
}

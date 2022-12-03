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
  if (data) {
    res.json({
      documents: data.documents,
      pages: Math.ceil(data.count / limit),
      success: true,
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
}

export async function getLastAlert(req: Request, res: Response) {
  const data = await getLastAlertDB();
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

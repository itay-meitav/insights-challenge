import express from "express";
import { getAlerts, getLastAlert } from "../controllers/alerts.controller";

const router = express.Router();

router.get("/", getAlerts);
router.get("/last", getLastAlert);

export default router;

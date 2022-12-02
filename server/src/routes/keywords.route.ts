import express from "express";
import { getKeywords, pushKeywords } from "../controllers/keywords.controller";

const router = express.Router();

router.route("/").get(getKeywords).post(pushKeywords);

export default router;

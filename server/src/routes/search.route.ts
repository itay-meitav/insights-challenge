import express from "express";
import { searchOptions } from "../controllers/search.controller";

const router = express.Router();

router.get("/", searchOptions);

export default router;

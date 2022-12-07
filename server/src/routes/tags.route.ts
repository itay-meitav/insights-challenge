import express from "express";
import { getTags, pushTags } from "../controllers/tags.controller";

const router = express.Router();

router.route("/").get(getTags).post(pushTags);

export default router;

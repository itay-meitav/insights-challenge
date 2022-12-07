import express from "express";
import pastesRouter from "./pastes.route";
import tagsRouter from "./tags.route";
import searchRouter from "./search.route";
import alertsRouter from "./alerts.route";

const router = express.Router();

router.use("/pastes", pastesRouter);
router.use("/tags", tagsRouter);
router.use("/search", searchRouter);
router.use("/alerts", alertsRouter);

export default router;

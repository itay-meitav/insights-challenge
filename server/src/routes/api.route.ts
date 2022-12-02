import express from "express";
import pastesRouter from "./pastes.route";
import keywordsRouter from "./keywords.route";
import searchRouter from "./search.route";
import alertsRouter from "./alerts.route";

const router = express.Router();

router.use("/posts", pastesRouter);
router.use("/keywords", keywordsRouter);
router.use("/search", searchRouter);
router.use("/alerts", alertsRouter);

export default router;

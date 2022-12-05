import express from "express";
import { getNewPastes, getPastes } from "../controllers/pastes.controller";

const router = express.Router();

router.get("/", getPastes);
router.get("/new", getNewPastes);

export default router;

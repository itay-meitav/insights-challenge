import express from "express";
import { validate, validatePastes } from "../middleware/paste.middleware";
import { getNewPastes, getPastes } from "../controllers/pastes.controller";

const router = express.Router();

router.get("/", validatePastes, validate, getPastes);
router.get("/new", getNewPastes);

export default router;

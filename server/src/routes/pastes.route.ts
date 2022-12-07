import express from "express";
import { validatePastes } from "../middleware/validation";
import { getNewPastes, getPastes } from "../controllers/pastes.controller";
import { errors } from "celebrate";

const router = express.Router();

router.get("/", validatePastes, getPastes);
router.get("/new", getNewPastes);
router.use(errors());

export default router;

import express from "express";
import {
  createFarm,
  deleteFarm,
  getFarms,
  getFarmRisk,
} from "../controllers/farmController.js";

const router = express.Router();

router.post("/", createFarm);
router.get("/", getFarms);
router.delete("/:id", deleteFarm);
router.get("/risk", getFarmRisk);

export default router;

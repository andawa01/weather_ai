import express from "express";
import { getWeatherHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getWeatherHistory);

export default router;

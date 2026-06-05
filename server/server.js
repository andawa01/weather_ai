import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import farmRoutes from "./routes/farmRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/farms", farmRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("AgriSense AI API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

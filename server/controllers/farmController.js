import db from "../config/db.js";
import { calculateRisk } from "../utils/riskCalculator.js";

// CREATE FARM
export const createFarm = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    const [result] = await db.query(
      "INSERT INTO farms (name, latitude, longitude) VALUES (?, ?, ?)",
      [name, latitude, longitude],
    );

    res.status(201).json({
      message: "Farm created successfully",
      farmId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating farm:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//GET ALL FARMS
export const getFarms = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM farms ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching farms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE FARM
export const deleteFarm = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM farms WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Farm not found" });
    }

    res.json({ message: "Farm deleted successfully" });
  } catch (error) {
    console.error("Error deleting farm:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET FARM RISK
export const getFarmRisk = async (req, res) => {
  try {
    const [farms] = await db.query("SELECT * FROM farms");

    const result = await Promise.all(
      farms.map(async (farm) => {
        const [logs] = await db.query(
          "SELECT * FROM weather_logs WHERE farm_id = ? ORDER BY recorded_at DESC LIMIT 1",
          [farm.id],
        );

        const log = logs[0];

        if (!log) {
          return {
            ...farm,
            risk: 0,
            status: "No data",
          };
        }

        const risk = calculateRisk(log);

        return {
          ...farm,
          latestWeather: log,
          risk,
          status: risk < 30 ? "Low" : risk < 70 ? "Medium" : "High",
        };
      }),
    );

    res.json(result);
  } catch (error) {
    console.error("Farm risk error:", error);
    res.status(500).json({ message: "Failed to compute farm risk" });
  }
};

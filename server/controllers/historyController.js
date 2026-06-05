import db from "../config/db.js";

export const getWeatherHistory = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM weather_logs
       ORDER BY recorded_at DESC
       LIMIT 20`,
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};

import * as weatherService from "../services/weatherService.js";
import { generateInsights } from "../utils/insights.js";
import db from "../config/db.js";

export const getWeather = async (req, res) => {
  try {
    const { lat, lon, farm_id } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const weather = await weatherService.getWeather(lat, lon);

    const insights = generateInsights(weather);

    const summary =
      typeof insights === "string" ? insights : JSON.stringify(insights);

    const temp = weather?.current?.temperature || 0;
    const wind = weather?.current?.wind_speed || 0;
    const humidity = weather?.hourly?.[0]?.humidity || 0;
    const rain = weather?.hourly?.[0]?.precipitation_probability || 0;

    await db.query(
      `INSERT INTO weather_logs 
      (farm_id, temperature, wind_speed, humidity, rain_probability, summary)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [farm_id || null, temp, wind, humidity, rain, summary],
    );

    res.json({ weather, insights });
  } catch (error) {
    console.error("Error in getWeather controller:", error);

    res.status(500).json({
      message: "Failed to fetch weather data",
      error: error.message,
    });
  }
};

export const getWeatherLogs = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM weather_logs ORDER BY recorded_at DESC",
    );

    res.json(rows);
  } catch (error) {
    console.error("Weather logs error:", error);

    res.status(500).json({
      message: "Failed to fetch weather logs",
      error: error.message,
    });
  }
};

import axios from "axios";

export const getWeather = async (lat, lon) => {
  try {
    console.log("KEY:", process.env.WEATHER_API_KEY);
    const response = await axios.get("https://api.weather-ai.co/v1/weather", {
      params: { lat, lon },
      headers: {
        Authorization: `Bearer ${process.env.WEATHER_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

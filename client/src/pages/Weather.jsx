import { useState } from "react";
import api from "../services/api";

function Weather() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await api.get("/weather?lat=-1.286389&lon=36.817223");

      setWeather(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Weather</h1>

      <button
        onClick={fetchWeather}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Load Weather
      </button>

      {weather && (
        <div className="bg-white shadow rounded-xl p-6 mt-6">
          <h2 className="text-xl font-bold">Current Weather</h2>

          <p>Temperature: {weather.weather.current.temperature}°C</p>

          <p>Wind Speed: {weather.weather.current.wind_speed} km/h</p>
          <p>Humidity: {weather.weather.hourly[0].humidity}%</p>
          <p>Summary: {weather.insights}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;

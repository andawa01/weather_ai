import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    farms: 0,
    weatherLogs: 0,
    insights: 0,
  });

  // NEW STATE FOR FARM RISK
  const [farms, setFarms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [farmsRes, weatherRes, riskRes] = await Promise.all([
          api.get("/farms"),
          api.get("/weather/logs"),
          api.get("/farms/risk"), // 👉 NEW API
        ]);

        setStats({
          farms: farmsRes.data.length ?? 0,
          weatherLogs: weatherRes.data.length ?? 0,
          insights: 1,
        });

        // STORE FARM RISK DATA
        setFarms(riskRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-green-700">
          AgriSense AI Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor farms, weather conditions, and AI recommendations.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-600">
          <h3 className="text-gray-500">Total Farms</h3>
          <p className="text-4xl font-bold text-green-700">
            {loading ? "Loading..." : stats.farms}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-600">
          <h3 className="text-gray-500">Weather Logs</h3>
          <p className="text-4xl font-bold text-blue-600">
            {loading ? "Loading..." : stats.weatherLogs}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-orange-500">
          <h3 className="text-gray-500">AI Insights</h3>
          <p className="text-4xl font-bold text-orange-500">
            {loading ? "Loading..." : stats.insights}
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome to AgriSense AI</h2>

        <p className="text-green-100">
          Track farm performance, monitor weather forecasts, and receive
          intelligent farming recommendations powered by AI.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg">
            Add Farm
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            View Weather
          </button>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg">
            AI Insights
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Farm Risk Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-800">{farm.name}</h3>

              <p className="mt-2 text-gray-600">
                Risk Score: <span className="font-bold">{farm.risk}%</span>
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  farm.status === "High"
                    ? "bg-red-100 text-red-700"
                    : farm.status === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {farm.status}
              </span>

              {/* Risk bar */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    farm.status === "High"
                      ? "bg-red-500"
                      : farm.status === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${farm.risk}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

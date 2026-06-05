import { useEffect, useState } from "react";
import api from "../services/api";

function Farms() {
  const [farms, setFarms] = useState([]);
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const fetchFarms = async () => {
    try {
      const res = await api.get("/farms");
      setFarms(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFarms();
  }, []);

  const addFarm = async (e) => {
    e.preventDefault();

    try {
      await api.post("/farms", {
        name,
        latitude,
        longitude,
      });

      setName("");
      setLatitude("");
      setLongitude("");

      fetchFarms();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFarm = async (id) => {
    try {
      await api.delete(`/farms/${id}`);
      fetchFarms();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white py-5 shadow">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">🌾 AgriSense AI</h1>
          <p className="text-green-100">Smart Farming Weather Intelligence</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Add Farm Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Farm</h2>

          <form onSubmit={addFarm} className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Farm Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="border rounded-lg p-3"
            />

            <button
              type="submit"
              className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition"
            >
              Add Farm
            </button>
          </form>
        </div>

        {/* Farm List */}
        <h2 className="text-2xl font-bold mb-4">My Farms</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-xl font-bold text-green-700">{farm.name}</h3>

              <div className="mt-3 text-gray-600">
                <p>📍 Latitude: {farm.latitude}</p>
                <p>📍 Longitude: {farm.longitude}</p>
              </div>

              <button
                onClick={() => deleteFarm(farm.id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete Farm
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Farms;

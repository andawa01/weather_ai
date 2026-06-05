import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Weather from "./pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-6xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/farms" element={<Farms />} />

            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

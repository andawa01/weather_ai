import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            🌾 <span>AgriSense AI</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-8 text-white font-medium">
            <Link to="/dashboard" className="hover:text-green-200 transition">
              Dashboard
            </Link>

            <Link to="/farms" className="hover:text-green-200 transition">
              Farms
            </Link>

            <Link to="/weather" className="hover:text-green-200 transition">
              Weather
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

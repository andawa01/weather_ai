# AgriSense AI

AgriSense AI is a full-stack smart farming dashboard built to monitor farms, surface live weather conditions, store historical weather logs, and generate simple AI-driven agricultural insights. The app combines a React/Vite frontend with an Express backend and MySQL storage.

---

## Live Demo

- Frontend: _(add deployed link here)_
- Backend API: _(add deployed backend URL here)_

---

## Key Features

- Farm management with create, read, and delete operations
- Live weather integration with external API support
- Rule-based AI insights for crop risk monitoring
- MySQL-backed weather log storage
- Farm risk scoring and basic recommendation summaries
- Dashboard overview for farms, weather, and insights

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js
- MySQL
- dotenv
- CORS

---

## API Endpoints

### Farms

- `GET /api/farms` → Retrieve all farms
- `POST /api/farms` → Create a new farm
- `DELETE /api/farms/:id` → Delete a farm
- `GET /api/farms/risk` → Get farm risk analysis

### Weather

- `GET /api/weather?lat=&lon=` → Fetch live weather for coordinates and save a log
- `GET /api/weather/logs` → Retrieve stored weather logs

---

## AI Insights Engine

The project generates basic agricultural insights from weather conditions using a rule-based engine:

- High temperature → Heat stress warning
- High rain probability → Flood or waterlogging risk
- Low humidity → Drought risk

Each weather request is evaluated and stored with a summary in the database.

---

## Database Schema

### farms

- `id` (INT, PK)
- `name` (VARCHAR)
- `latitude` (DECIMAL)
- `longitude` (DECIMAL)
- `created_at` (TIMESTAMP)

### weather_logs

- `id` (INT, PK)
- `farm_id` (INT, FK optional)
- `temperature` (DECIMAL)
- `wind_speed` (DECIMAL)
- `humidity` (INT)
- `rain_probability` (INT)
- `summary` (TEXT)
- `recorded_at` (TIMESTAMP)

---

## Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/weather_ai.git
cd weather_ai
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agriverse
PORT=5000
WEATHER_API_KEY
```

Start the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## Environment Variables

Backend requires:

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`
- `WEATHER_API_KEY`

If your weather integration uses a third-party API, add the corresponding API key here as well.

---

## Project Structure

- `client/` — React frontend and UI components
- `server/` — Express backend and API routes
- `server/controllers/` — Request handlers
- `server/routes/` — API route definitions
- `server/services/` — Weather and insight logic
- `server/config/` — Database connection config
- `server/utils/` — Helper modules

---

## Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- PlanetScale
- Railway MySQL
- Hosted MySQL instance

---

## Author

**Evans Andawa**

---

## Notes

This project demonstrates full-stack development, API integration, database design, dashboard UI development, and simple AI-driven decision logic.

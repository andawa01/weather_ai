export const generateInsights = (weather) => {
  const hourly = weather.hourly || [];

  const maxRain = Math.max(
    ...hourly.map((h) => h.precipitation_probability || 0),
  );

  const maxUV = Math.max(...hourly.map((h) => h.uv_index || 0));

  const avgWind =
    hourly.reduce((sum, h) => sum + (h.wind_speed || 0), 0) /
    (hourly.length || 1);

  let insights = [];

  if (maxRain >= 70) {
    insights.push("High chance of heavy rain. Avoid irrigation.");
  }

  if (maxRain >= 40 && maxRain < 70) {
    insights.push("Possible rain later today. Plan farming activities early.");
  }

  if (maxUV >= 7) {
    insights.push("High UV levels. Protect crops and workers at midday.");
  }

  if (avgWind > 10) {
    insights.push("Strong winds expected. Secure light farm structures.");
  }

  if (insights.length === 0) {
    insights.push("Weather is stable. Good conditions for farming activities.");
  }

  return insights;
};

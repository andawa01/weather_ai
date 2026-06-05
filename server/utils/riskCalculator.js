export const calculateRisk = (log) => {
  let risk = 0;

  if (log.temperature > 30) risk += 25;
  else if (log.temperature < 15) risk += 15;

  if (log.rain_probability > 70) risk += 30;
  else if (log.rain_probability > 40) risk += 15;

  if (log.wind_speed > 25) risk += 20;

  if (log.humidity > 80) risk += 10;
  if (log.humidity < 30) risk += 10;

  return Math.min(risk, 100);
};

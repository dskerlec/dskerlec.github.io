export  const weatherDescriptions = {};
weatherDescriptions[0] = "Clear Sky";
weatherDescriptions[1] = "Mainly Clear";
weatherDescriptions[2] = "Partly Cloudy";
weatherDescriptions[3] = "Overcast";
weatherDescriptions[45] = "Fog";
weatherDescriptions[48] = "";
export const apiWeatherURL = `https://api.open-meteo.com/v1/forecast?latitude=41.50&longitude=-81.70&timezone=EST&hourly=temperature_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`
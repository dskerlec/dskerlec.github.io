var api_key = "966a0a57eeb345ed9ad20329e41f7556";
var api_url = "https://api.opencagedata.com/geocode/v1/json";

let apiWeatherUrl = "";

export function updateWeatherUrl(latitude, longitude) {
  apiWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=EST&hourly=temperature_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;
  return {apiWeatherUrl};
}

export function updateGeocoding(query) {
  var request_url = api_url + "?" + "key=" + api_key + "&q=" + encodeURIComponent(query) + "&pretty=1" + "&no_annotations=1";
  return fetch(request_url)
    .then((response) => response.json())
    .then((data) => {
      let latitude = data.results[0].geometry.lat;
      let longitude = data.results[0].geometry.lng;
      return { latitude, longitude };
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


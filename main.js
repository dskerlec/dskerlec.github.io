'use strict';
 const form = document.querySelector('form');
 const cityInput = document.querySelector('#city');
 const stateInput = document.querySelector('#state');
 //const latInput = document.querySelector('#latitude');
 const latInput = '41.50';
 //const longInput = document.querySelector('#longitude');
 const longInput = '-81.70';
 const forecastDiv = document.querySelector('#forecast');


//  form.addEventListener('submit', e => {
//     e.preventDefault();    
//     fetch(apiWeatherUrl)
//       .then(response => response.json())
//       .then(data => {
//         // display the forecast data
//         const temperature = data.hours[0].temperature_2m.value;
//         const humidity = data.hours[0].relative_humidity_2m.value;
//         forecastDiv.innerHTML = `Temperature: ${temperature}°C<br>Humidity: ${humidity}%`;
//       })
//       .catch(error => {
//         // handle any errors
//         console.error(error);
//       });
//   });
form.addEventListener('submit', getWeather(latInput, longInput))

  function getWeather(lat, long) {
     // const city = cityInput.value;
    // const apiCityToLongLatUrl = 'https://nominatim.openstreetmap.org/search?q=${cityInput},${stateInput}';
    const apiWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
    console.log(apiWeatherUrl);
    console.log("lat" + lat);
    console.log("long" + long);
    fetch(apiWeatherUrl)
      .then(response => response.json())
        //console.log(response.status);
        //console.log(response.json());
      .then(data => {
        let hourlyTemps = data.hourly.temperature_2m; //array of celcius temps for next x hours
        hourlyTemps.forEach(element => console.log(element * (9/5) + 32)); //outputting single f temps to console
      })
      .catch(error => console.error(error));
  }
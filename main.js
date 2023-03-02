'use strict';
//TODO: allow user to select a city state and geocode it to return long/lat
//possibly use a dropdown and store long/lat? or use another api call
 //const cityInput = document.querySelector('#city');
 //const stateInput = document.querySelector('#state');
 //const latInput = document.querySelector('#latitude');
 //const longInput = document.querySelector('#longitude');
 const latInput = '41.50';
 const longInput = '-81.70';
 const todayDiv = document.querySelector('#dailyOne');
 const tomorrowDiv = document.querySelector('#dailyTwo');
 const overmorrowDiv = document.querySelector('#dailyThree');
 const nowDiv = document.querySelector('#hourlyOne');
 const nextHoursDiv = document.querySelector('#hourlyTwo');
 const laterHoursDiv = document.querySelector('#hourlyThree');
 let date = new Date();
 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 let day = getCurrentDate(date);
 let hour = getCurrentHour(date);
 getWeather(latInput, longInput)


  function getWeather(lat, long) 
  {
     // const city = cityInput.value;
    // const apiCityToLongLatUrl = 'https://nominatim.openstreetmap.org/search?q=${cityInput},${stateInput}';
    const apiWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&temperature_unit=fahrenheit&currenttemperature=true&timezone=EST&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m`;
    fetch(apiWeatherUrl)
      .then(response => response.json())
      .then(data => {
        let result = data;

        let todayHigh = getTemp(result, "daily", 0, "max");
        let todayLow = getTemp(result, "daily", 0, "min");
        let tomorrowHigh = getTemp(result, "daily", 1, "max");
        let tomorrowLow = getTemp(result, "daily", 1, "min");
        let overmorrowHigh = getTemp(result, "daily", 2, "max");
        let overmorrowLow = getTemp(result, "daily", 1, "min");

        //TODO:get dates and replace "today tomorrow and overmorrow with actual dates"
        todayDiv.innerHTML = `${day}:<br>High Temperature: ${todayHigh}°F<br>Low Temperature: ${todayLow}°F`
        tomorrowDiv.innerHTML = `Tomorrow's Temperatures:<br>High Temperature: ${tomorrowHigh}°F<br>Low Temperature: ${tomorrowLow}°F`
        overmorrowDiv.innerHTML = `Overmorrow's Temperatures:<br>High Temperature: ${overmorrowHigh}°F<br>Low Temperature: ${overmorrowLow}°F`

        //TODO: get current time
        let nowTemp = getTemp(result, "hourly", hour);
        //let nowPrecip
        let nextTemp = getTemp(result, "hourly", (hour+3));
        //let nextPrecip
        let laterTemp = getTemp(result, "hourly", (hour+6));
        //let laterPrecip

        //TODO: update with precip codes, 
        //need a constant to list out the codes
        //possibly correlate each code with an image???
        nowDiv.innerHTML = `Now:<br>Current Temperature: ${nowTemp}°F<br>Current Precipitation:`
        nextHoursDiv.innerHTML = `in 3 Hours:<br>Current Temperature: ${nextTemp}°F<br>Current Precipitation:`
        laterHoursDiv.innerHTML = `in 6 Hours:<br>Current Temperature: ${laterTemp}°F<br>Current Precipitation:`

      })
      .catch(error => console.error(error));
  }

  //break out into getDailyTemp and getHourlyTemp??
  function getTemp(data, forecastType, timeInterval, dailyType)
  {
    switch (forecastType) 
    {
      case "daily":
        if (dailyType === "max")
          return data.daily.temperature_2m_max[timeInterval];
        else 
          return data.daily.temperature_2m_min[timeInterval];
      case "hourly":
        return data.hourly.temperature_2m[timeInterval];
      default:
        //error
    }
  }
  
  function getCurrentHour(date)
  {
      return date.getHours();
  }

  function getCurrentDate(date)
  {
      let month = months[date.getMonth()];
      let day = date.getDate();
      let year = date.getFullYear();
      return `${month} ${day} , ${year}`
  }
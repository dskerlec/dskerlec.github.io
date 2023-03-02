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
 //const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//  let day = getCurrentDate(date);
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

        let today = getDay(data, 0);
        let todayHigh = getTemp(data, "daily", 0, "max");
        let todayLow = getTemp(data, "daily", 0, "min");
        let tomorrow = getDay(data, 1);
        let tomorrowHigh = getTemp(data, "daily", 1, "max");
        let tomorrowLow = getTemp(data, "daily", 1, "min");
        let overmorrow = getDay(data, 2);
        let overmorrowHigh = getTemp(data, "daily", 2, "max");
        let overmorrowLow = getTemp(data, "daily", 1, "min");

        //TODO:get dates and replace "today tomorrow and overmorrow with actual dates"
        todayDiv.innerHTML = `${today}:<br>High Temperature: ${todayHigh}°F<br>Low Temperature: ${todayLow}°F`
        tomorrowDiv.innerHTML = `${tomorrow} Temperatures:<br>High Temperature: ${tomorrowHigh}°F<br>Low Temperature: ${tomorrowLow}°F`
        overmorrowDiv.innerHTML = `${overmorrow} Temperatures:<br>High Temperature: ${overmorrowHigh}°F<br>Low Temperature: ${overmorrowLow}°F`

        //TODO: get current time
        let now = getHour(data, hour);
        let nowTemp = getTemp(data, "hourly", hour);
        //let nowPrecip
        let next = getHour(data, (hour+3));
        let nextTemp = getTemp(data, "hourly", (hour+3));
        //let nextPrecip
        let later = getHour(data, (hour+6));
        let laterTemp = getTemp(data, "hourly", (hour+6));
        //let laterPrecip

        //TODO: update with precip codes,
        //need a constant to list out the codes
        //possibly correlate each code with an image???
        nowDiv.innerHTML = `At ${now} :<br>Current Temperature: ${nowTemp}°F<br>Current Precipitation:`
        nextHoursDiv.innerHTML = `At ${next} :<br>Current Temperature: ${nextTemp}°F<br>Current Precipitation:`
        laterHoursDiv.innerHTML = `At ${later} :<br>Current Temperature: ${laterTemp}°F<br>Current Precipitation:`

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

  function getDay(data, dayIndex)
  {
    return data.daily.time[dayIndex];
  }

  function getHour(data, hourIndex)
  {
    return data.hourly.time[hourIndex];
  }

  // function getCurrentDate(date)
  // {
  //     let month = months[date.getMonth()];
  //     let day = date.getDate();
  //     let year = date.getFullYear();
  //     return `${month} ${day} , ${year}`
  // }
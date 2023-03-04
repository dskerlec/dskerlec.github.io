'use strict';
//TODO: allow user to select a city state and geocode it to return long/lat
//possibly use a dropdown and store long/lat? or use another api call
 const latInput = '41.50';
 const longInput = '-81.70';
 const todayDiv = document.querySelector('#dailyOne');
 const tomorrowDiv = document.querySelector('#dailyTwo');
 const overmorrowDiv = document.querySelector('#dailyThree');
 const nowDiv = document.querySelector('#hourlyOne');
 const nextHoursDiv = document.querySelector('#hourlyTwo');
 const laterHoursDiv = document.querySelector('#hourlyThree');
 let date = new Date();
 let hour = getCurrentHour(date);
 getWeather(latInput, longInput)
//testing branch

  function getWeather(lat, long) 
  {
    const apiWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=41.50&longitude=-81.70&timezone=EST&hourly=temperature_2m,precipitation_probability,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`;
    fetch(apiWeatherUrl)
      .then(response => response.json())
      .then(data => {
        //console log to view the variable in console for working with it. Remove this for production
        console.log(data);
        let today = getDay(data, 0);
        let todayHigh = getTemp(data, "daily", 0, "max");
        let todayLow = getTemp(data, "daily", 0, "min");
        let tomorrow = getDay(data, 1);
        let tomorrowHigh = getTemp(data, "daily", 1, "max");
        let tomorrowLow = getTemp(data, "daily", 1, "min");
        let overmorrow = getDay(data, 2);
        let overmorrowHigh = getTemp(data, "daily", 2, "max");
        let overmorrowLow = getTemp(data, "daily", 1, "min");
        //precipitation variables
        let nowPrecipitation = getPrecipitation(data, hour);
        let nextPrecipitation = getPrecipitation(data, (hour+3));
        let laterPrecipitation = getPrecipitation(data, (hour+6));

        //TODO:clean up actual dates
        todayDiv.innerHTML = `${today}:<br>High Temperature: ${todayHigh}°F<br>Low Temperature: ${todayLow}°F`
        tomorrowDiv.innerHTML = `${tomorrow} Temperatures:<br>High Temperature: ${tomorrowHigh}°F<br>Low Temperature: ${tomorrowLow}°F`
        overmorrowDiv.innerHTML = `${overmorrow} Temperatures:<br>High Temperature: ${overmorrowHigh}°F<br>Low Temperature: ${overmorrowLow}°F`

        //TODO: clean current time
        let now = getHour(data, hour);
        let nowTemp = getTemp(data, "hourly", hour);
        //let nowPrecip
        let next = getHour(data, (hour+3));
        let nextTemp = getTemp(data, "hourly", (hour+3));
        //let nextPrecip
        let later = getHour(data, (hour+6));
        let laterTemp = getTemp(data, "hourly", (hour+6));
        

        //TODO: update with precip codes,
        //need a constant to list out the codes
        //possibly correlate each code with an image???
        nowDiv.innerHTML = `At ${now} :<br>Current Temperature: ${nowTemp}°F<br>Current Precipitation:${nowPrecipitation}%`
        nextHoursDiv.innerHTML = `At ${next} :<br>Current Temperature: ${nextTemp}°F<br>Current Precipitation:${nextPrecipitation}%`
        laterHoursDiv.innerHTML = `At ${later} :<br>Current Temperature: ${laterTemp}°F<br>Current Precipitation:${laterPrecipitation}%`

      })
      .catch(error => console.error(error));
  }

//get daily precipitation
function getPrecipitation(data, hour) {
  return data.hourly.precipitation_probability[hour];
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

  
"use strict";
import weatherDescriptions from "./constants.js";
//TODO: allow user to select a city state and geocode it to return long/lat
//possibly use a dropdown and store long/lat? or use another api call
//TODO: possibly create these constants outside in a seperate file and import them in so it looks neater?

// Import functions from maps.js
import { updateGeocoding, updateWeatherUrl } from "./maps.js";

//query selectors for updating html
const todayDiv = document.querySelector("#dailyOne");
 const todayImg = document.getElementById("dailyImageOne");
const tomorrowDiv = document.querySelector("#dailyTwo");
const overmorrowDiv = document.querySelector("#dailyThree");
const nowDiv = document.querySelector("#hourlyOne");
const nextHoursDiv = document.querySelector("#hourlyTwo");
const laterHoursDiv = document.querySelector("#hourlyThree");

//date stuff for getting current time stamps
let date = new Date();
let hour = getCurrentHour(date);

//TODO: update the long and lat to be dynamic for multi city weather capabilities
//url for the api call

//store weather data result in variable
let weatherData;

 //weather data variables to be set
 let today;
 let todayHigh;
 let todayLow;
 let todayCode;

 let tomorrow;
 let tomorrowHigh;
 let tomorrowLow;
 let tomorrowCode;

 let overmorrow;
 let overmorrowHigh;
 let overmorrowLow;
 let overmorrowCode;

 let now;
 let nowTemp;
 let nowPrecipitation;
 let nowCode;

 let next;
 let nextTemp;
 let nextPrecipitation;
 let nextCode;

 let later;
 let laterTemp;
 let laterPrecipitation;
 let laterCode;

function fetchWeather(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      weatherData = data;
      //NOTE we can call any function in here now that needs weather data or see above
      parseWeatherData();
      updateWeatherDisplay();
    })
    .catch((error) => console.error(error));
}

function parseWeatherData() {
  today = getDay(weatherData, 0);
  todayHigh = getTemp(weatherData, "daily", 0, "max");
  todayLow = getTemp(weatherData, "daily", 0, "min");
  todayCode = (weatherDescriptions[getWeatherCode(weatherData, "daily", 0)]).description;
  //todayPicture = (weatherDescriptions[getWeatherCode(weatherData, "daily", 0)]).image;
  console.log((weatherDescriptions[getWeatherCode(weatherData, "daily", 0)]).image);
  console.log(todayImg);

  tomorrow = getDay(weatherData, 1);
  tomorrowHigh = getTemp(weatherData, "daily", 1, "max");
  tomorrowLow = getTemp(weatherData, "daily", 1, "min");
  tomorrowCode = (weatherDescriptions[getWeatherCode(weatherData, "daily", 1)]).description;

  overmorrow = getDay(weatherData, 2);
  overmorrowHigh = getTemp(weatherData, "daily", 2, "max");
  overmorrowLow = getTemp(weatherData, "daily", 2, "min");
  overmorrowCode = (weatherDescriptions[getWeatherCode(weatherData, "daily", 2)]).description;

  //TODO: clean current time
  now = getHour(weatherData, hour);
  nowTemp = getTemp(weatherData, "hourly", hour);
  nowPrecipitation = getPrecipitation(weatherData, hour);
  nowCode = getWeatherCode(weatherData, "hourly", hour);

  next = getHour(weatherData, hour + 3);
  nextTemp = getTemp(weatherData, "hourly", hour + 3);
  nextPrecipitation = getPrecipitation(weatherData, hour + 3);
  nextCode = getWeatherCode(weatherData, "hourly", hour + 3);

  later = getHour(weatherData, hour + 6);
  laterTemp = getTemp(weatherData, "hourly", hour + 6);
  laterPrecipitation = getPrecipitation(weatherData, hour + 6);
  laterCode = getWeatherCode(weatherData, "hourly", hour + 6);
}

function updateWeatherDisplay() {
  //TODO:clean up actual dates
  todayDiv.innerHTML = `${today}:<br>High Temperature: ${todayHigh}°F<br>Low Temperature: ${todayLow}°F<br> the conditions are: ${todayCode}`;
  todayImg.src = "\images\weather_icons\sunny_icon.png";
    tomorrowDiv.innerHTML = `${tomorrow} Temperatures:<br>High Temperature: ${tomorrowHigh}°F<br>Low Temperature: ${tomorrowLow}°F<br> the conditions are: ${tomorrowCode}`;
  overmorrowDiv.innerHTML = `${overmorrow} Temperatures:<br>High Temperature: ${overmorrowHigh}°F<br>Low Temperature: ${overmorrowLow}°F<br> the conditions are: ${overmorrowCode}`;
  //TODO: update with precip codes
  nowDiv.innerHTML = `At ${now} :<br>Current Temperature: ${nowTemp}°F<br>Precipitation Chance:${nowPrecipitation}%`;
  nextHoursDiv.innerHTML = `At ${next} :<br>Current Temperature: ${nextTemp}°F<br>Precipitation Chance:${nextPrecipitation}%`;
  laterHoursDiv.innerHTML = `At ${later} :<br>Current Temperature: ${laterTemp}°F<br>Precipitation Chance:${laterPrecipitation}%`;
}

//get daily precipitation
function getPrecipitation(data, hour) {
  return data.hourly.precipitation_probability[hour];
}

//break out into getDailyTemp and getHourlyTemp??
function getTemp(data, forecastType, timeInterval, dailyType) {
  switch (forecastType) {
    case "daily":
      if (dailyType === "max")
        return data.daily.temperature_2m_max[timeInterval];
      else return data.daily.temperature_2m_min[timeInterval];
    case "hourly":
      return data.hourly.temperature_2m[timeInterval];
    default:
    //error
  }
}

  function getWeatherCode(data, forecastType, timeInterval)
  {
    switch (forecastType) 
    {
      case "daily":
          return data.daily.weathercode[timeInterval];
      case "hourly":
        return data.hourly.weathercode[timeInterval];
      default:
        //error
    }
  }

function getCurrentHour(date) {
  return date.getHours();
}

function getDay(data, dayIndex) {
  return data.daily.time[dayIndex];
}

function getHour(data, hourIndex) {
  return data.hourly.time[hourIndex];
}

// This button updates the longitutde/latitude in the query url

var userInput = document.getElementById("address-input");
var searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", () => {
  updateGeocoding(userInput.value)
    .then((newCoordinates) => {
      let updatedUrl = updateWeatherUrl(
        newCoordinates.latitude,
        newCoordinates.longitude
      ).apiWeatherUrl;
      fetchWeather(updatedUrl);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

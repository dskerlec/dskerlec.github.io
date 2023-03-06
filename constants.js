class WeatherDescription {
    constructor(code, description,image) {
      this.code = code;
      this.description = description;
      this.image = image;
    }
  }
  
  const weatherDescriptions = {
    0: new WeatherDescription(0, "Clear Sky", "\\images\\weather_icons\\sunny_icon.png"),
    1: new WeatherDescription(1, "Mainly Clear", "\\images\\weather_icons\\sunny_icon.png"),
    2: new WeatherDescription(2, "Partly Cloudy", "\\images\\weather_icons\\sunny_icon.png"),
    3: new WeatherDescription(3, "Overcast", "\\images\\weather_icons\\sunny_icon.png"),
    45: new WeatherDescription(45, "Fog", "\\images\\weather_icons\\sunny_icon.png"),
    48: new WeatherDescription(48, "Depositing Rime Fog", "\\images\\weather_icons\\sunny_icon.png"),
    51: new WeatherDescription(51, "Light Drizzle", "\\images\\weather_icons\\sunny_icon.png"),
    53: new WeatherDescription(53, "Moderate Drizzle", "\\images\\weather_icons\\sunny_icon.png"),
    55: new WeatherDescription(55, "Dense Drizzle", "\\images\\weather_icons\\sunny_icon.png"),
    56: new WeatherDescription(56, "Light Freezing Drizzle", "\\images\\weather_icons\\sunny_icon.png"),
    57: new WeatherDescription(57, "Dense Freezing Drizzle", "\\images\\weather_icons\\sunny_icon.png"),
    61: new WeatherDescription(61, "Slight Rain", "\\images\\weather_icons\\sunny_icon.png"),
    63: new WeatherDescription(63, "Moderate Rain", "\\images\\weather_icons\\sunny_icon.png"),
    65: new WeatherDescription(65, "Heavy Rain", "\\images\\weather_icons\\sunny_icon.png"),
    66: new WeatherDescription(66, "Light Freezing Rain", "\\images\\weather_icons\\sunny_icon.png"),
    67: new WeatherDescription(67, "Heavy Freezing Rain", "\\images\\weather_icons\\sunny_icon.png"),
    71: new WeatherDescription(71, "Slight Snow Fall", "\\images\\weather_icons\\sunny_icon.png"),
    73: new WeatherDescription(73, "Moderate Snow Fall", "\\images\\weather_icons\\sunny_icon.png"),
    75: new WeatherDescription(75, "Heavy Snow Fall", "\\images\\weather_icons\\sunny_icon.png"),
    77: new WeatherDescription(77, "Snow Grains", "\\images\\weather_icons\\sunny_icon.png"),
    80: new WeatherDescription(80, "Slight Rain Showers", "\\images\\weather_icons\\sunny_icon.png"),
    81: new WeatherDescription(81, "Moderate Rain Showers", "\\images\\weather_icons\\sunny_icon.png"),
    82: new WeatherDescription(82, "Violent Rain Showers", "\\images\\weather_icons\\sunny_icon.png"),
    85: new WeatherDescription(85, "Slight Snow Showers", "\\images\\weather_icons\\sunny_icon.png"),
    86: new WeatherDescription(86, "Heavy Snow Showers", "\\images\\weather_icons\\sunny_icon.png"),
    95: new WeatherDescription(95, "Thunderstorms", "\\images\\weather_icons\\sunny_icon.png"),
    96: new WeatherDescription(96, "Thunderstorms and Slight Hail", "\\images\\weather_icons\\sunny_icon.png"),
    99: new WeatherDescription(99, "Thunderstorms and Heavy Hail", "\\images\\weather_icons\\sunny_icon.png"),
  };

export default weatherDescriptions;

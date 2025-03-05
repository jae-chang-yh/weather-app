"use strict";
/* ---- Declaration & Initialization ---- */
const apiKey = "0375ed7f592041aa82336348a69a94ba";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const error = document.querySelector(".error");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

/* ---- Check Weather Function ---- */
async function checkWeather(cityName) {
  weather.classList.remove("hide");
  const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${cityName}`);

  if (response.status == 404) {
    weather.classList.add("hide");
    error.classList.remove("hide");
  } else {
    let data = await response.json();

    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/cloud.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "assets/sun.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "assets/mist.png";
    }

    weather.classList.remove("hide");
    error.classList.add("hide");
  }
}

/* ---- Search Button Event Listener ---- */
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

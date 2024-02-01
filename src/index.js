import _ from "lodash";

const search = document.querySelector(".search-city");
const city = document.querySelector(".name-city-input");
const imgBox = document.querySelector(".img-climate-box");

const name = document.querySelector(".name-city");
const temperature = document.querySelector(".temperature-climate");
const description = document.querySelector(".description-climate");
const wind = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity-percentage");

async function Weather() {
  const APIkey = "  ";
  const Namecity = city.value;

  if (Namecity !== "") {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather/?q=${Namecity}&appid=${APIkey}`,
      { mod: "cors" },
    );

    const cityWeatherData = await weatherData.json();

    if (cityWeatherData.cod === "404") {
      InvalidCity(Namecity);
    } else {
      setWeatherData(cityWeatherData);
    }
    city.value = "";
  }
}

function InvalidCity(city) {
  name.textContent = city;
  imgBox.innerHTML = '<i class="fi fi-sr-risk-alt"></i>';
  temperature.textContent = "Non-existent city";
  description.textContent = "";

  humidity.textContent = "";
  wind.textContent = "";
}
function setWeatherData(data) {
  switch (data.weather[0].main) {
    case "Clear":
      imgBox.innerHTML = '<i class="fi fi-sr-brightness"></i>';
      break;

    case "Rain":
      imgBox.innerHTML = '<i class="fi fi-sr-cloud-showers-heavy"></i>';
      break;

    case "Snow":
      imgBox.innerHTML = '<i class="fi fi-sr-cloud-snow"></i>';
      break;

    case "Clouds":
      imgBox.innerHTML = '<i class="fi fi-sr-cloud"></i>';
      break;

    case "Haze":
      imgBox.innerHTML = '<i class="fi fi-sr-smog"></i>';
      break;

    default:
      imgBox.innerHTML = "";
  }
  name.textContent = data.name;

  temperature.textContent = `${parseInt(data.main.temp) - 273}°C`;
  description.textContent = data.weather[0].description;

  humidity.textContent = `${data.main.humidity}% `;
  wind.textContent = `${data.wind.speed} m/s`;
}

search.addEventListener("click", Weather);

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weathreDetails = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
// const myForm = document.querySelector(".myForm");

search.addEventListener("click", (event) => {
  event.preventDefault();
  const apiKey = "98740f4ebc0d63bc0f8ba70090e5a091";
  const city = document.querySelector(".search-box input").value;
  console.log(city);

  if (city == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        error404.classList.add("active");
        weatherBox.classList.remove("active");
        weathreDetails.classList.remove("active");
        console.log(json.cod);
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temprature = document.querySelector(".weather-box .temprature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-detail .humidity span");
      const wind = document.querySelector(".weather-detail .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = "555px";
        weatherBox.classList.add("active");
        container.classList.add("active");
        weathreDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;

          case "Rain":
            image.src = "images/rain.png";
            break;

          case "Snow":
            image.src = "images/snow.png";
            break;

          case "Clouds":
            image.src = "images/cloud.png";
            break;

          case "Mist":
            image.src = "images/mist.png";
            break;

          case "Haze":
            image.src = "images/mist.png";
            break;

          default:
            image.src = "images/cloud.png";
        }

        temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        // Info Weather //
        const cloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone"
        );
        const totalcloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        // info Humidity
        const cloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone"
        );
        const totalcloneInfoHumidity = cloneInfoHumidity.length;
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        // info Wind
        const cloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone"
        );
        const totalcloneInfoWind = cloneInfoWind.length;
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalcloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 1000);
        }
      }
    });
});

// const apiKey = "98740f4ebc0d63bc0f8ba70090e5a091";
// const city = document.querySelector(".search-box input").value;

// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data));

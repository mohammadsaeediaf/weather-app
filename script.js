const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weathreDetails = document.querySelector(".weather-detail");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

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
    });
});

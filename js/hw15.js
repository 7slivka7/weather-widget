const weatherBlock = document.querySelector("#weather");

async function loadWeather() {
  const cityInput = document.getElementById("cityInput").value;

  if (!cityInput.trim()) {
    alert("Please enter a city name");
    return;
  }

  weatherBlock.innerHTML = `
    <div class="loadline">
        <img src="./img/loadline.gif" alt="Loading">
    </div>`;

  const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput}&appid=3dce21746d7fd70df4ebb2fea51aa47b`;
  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  const location = data.name;
  const coordinates = `(${data.coord.lat}, ${data.coord.lon})`;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const windSpeed = data.wind.speed;
  const windDirection = data.wind.deg; 
  const humidity = data.main.humidity;
  const visibilityM = data.visibility;
  const visibilityKm = (visibilityM / 1000).toFixed(1);

  function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor(degrees / 45) % 8;
    return directions[index];
  }

  const windDirectionText = getWindDirection(windDirection);

  const template = `
    <div class="face front">
      <div class="weather-city">${location}</div>
      <div class="weather-coordinates">${coordinates}</div>
      <div class="weather-icon">
        <div class="weather-status">${weatherStatus}</div>
        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}"/>
      </div>
      <div class="weather-temp">${temp}&#186C</div>
      <div class="weather-feel-like">Feels like: ${feelsLike}&#186C</div>
    </div>
    <div class="face back">
      <div class="weather-wind">
      <div>Wind: ${windSpeed} m/s, ${windDirectionText}</div>
      <div>Humidity: ${humidity}%</div>
      <div>Visibility: ${visibilityKm} km</div>
      </div>
    </div>`;
  weatherBlock.innerHTML = template;
}

const weatherButton = document.querySelector("button");
weatherButton.addEventListener("click", loadWeather);
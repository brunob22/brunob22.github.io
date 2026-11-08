const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');

function getWeather() {
  const city = cityInput.value;
  if (!city) {
    alert('Wpisz nazwę miasta');
    return;
  }

  currentWeatherDiv.innerHTML = '';
  forecastDiv.innerHTML = '';

  getCurrentWeather(city);
  getForecast(city);
}


function getCurrentWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=&units=metric&lang=pl`;
  let req = new XMLHttpRequest();
  req.open("GET", url, true);

  req.addEventListener("load", function(event) {

    const data = JSON.parse(req.responseText);
    console.log('current', data);
    displayCurrentWeather(data);

});
  req.send(null);

}

async function getForecast(city) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0&units=metric&lang=pl`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('forecast',data);
    displayForecast(data);
}

function displayCurrentWeather(data) {
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const cityName = data.name;
  const iconName = data.weather[0].icon;
  const windSpeed = data.wind.speed;

  currentWeatherDiv.innerHTML = '<h2>Aktualna pogoda dla: ' + cityName + '</h2>';

  const card = document.createElement('div');
  card.className = 'current-card';
  card.innerHTML = '<img src="https://openweathermap.org/img/wn/' + iconName + '@2x.png">' + '<p><strong>Temperatura:</strong> ' + temp + ' °C</p>' + '<p><strong>' + description + '</strong></p>' + '<p><strong>Wiatr:</strong> ' + windSpeed + ' m/s</p>';
  currentWeatherDiv.appendChild(card);
}




function displayForecast(data) {
  forecastDiv.innerHTML = '<h2>Prognoza pogody</h2>';

  for (let i = 0; i < data.list.length; i++) {

    let item = data.list[i];

    const date = new Date(item.dt * 1000).toLocaleString('pl-PL');
    const temp = item.main.temp;
    const description = item.weather[0].description;
    const iconName = item.weather[0].icon;
    const windSpeed = item.wind.speed;

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = '<p><strong>' + date + '</strong></p>' + '<img src="https://openweathermap.org/img/wn/' + iconName + '@2x.png">' + '<p><strong>Temperatura:</strong> ' + temp + ' °C</p>' + '<p><strong>' + description + '</strong></p>' + '<p><strong>Wiatr:</strong> ' + windSpeed + ' m/s</p>';
    forecastDiv.appendChild(card);
  }
}


searchBtn.addEventListener('click', getWeather);

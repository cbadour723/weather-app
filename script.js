const apiKey = 'da69b7aeae754d5a9e141711241108'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=da69b7aeae754d5a9e141711241108&q=${city}&days=1&aqi=no&alerts=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    if (data.error) {
        weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
    } else {
        const weatherDetails = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_f}°F</p>
            <p>Weather: ${data.current.condition.text}</p>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
        `;
        weatherInfo.innerHTML = weatherDetails;
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByLocation(lat, lon);
    });
}

function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


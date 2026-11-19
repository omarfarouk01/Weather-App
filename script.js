async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        // Find the city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            alert("City not found!");
            return;
        }

        const location = geoData.results[0];

        // Get weather information
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        // Display weather information
        document.getElementById("cityName").textContent = location.name;

        document.getElementById("temperature").textContent =
            current.temperature_2m + "°C";

        document.getElementById("humidity").textContent =
            current.relative_humidity_2m;

        document.getElementById("wind").textContent =
            current.wind_speed_10m;

        document.getElementById("description").textContent =
            getDescription(current.weather_code);
        document.getElementById("weatherIcon").textContent =
    getWeatherIcon(current.weather_code);

    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
}

function getDescription(code) {

    if (code === 0) return "Clear Sky";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snowy";
    if (code <= 82) return "Rain Showers";
    if (code <= 99) return "Thunderstorm";

    return "Unknown Weather";
}
function getWeatherIcon(code) {

    if (code === 0) return "☀️";
    if (code <= 3) return "🌤️";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    if (code <= 86) return "🌨️";
    if (code <= 99) return "⛈️";

    return "🌤️";
}

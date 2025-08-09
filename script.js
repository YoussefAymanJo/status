const API_KEY = "5d6d31b12ff8f2b66fe10fda00cfea69";
document.getElementById("dark-mode").addEventListener("click", darkModeToggle);
let isDarkMode = false;
function darkModeToggle() {
    if (isDarkMode) {
        isDarkMode = !isDarkMode;
        document.body.style.background = "linear-gradient(to bottom left, #D1E0D7, #607EBC)";
        document.body.style.color = "#1a1a1a";
        document.getElementById("dark-mode").innerHTML = "Light mode";
        document.getElementById("dark-mode").style.color = "#1a1a1a";
        document.getElementById("dark-mode").style.background = "#f0f0f0";
    } else {
        isDarkMode = !isDarkMode;
        document.body.style.background = "linear-gradient(to bottom left, #1a1a1a, #333333)";
        document.body.style.color = "#f0f0f0";
        document.getElementById("dark-mode").innerHTML = "Dark mode";
        document.getElementById("dark-mode").style.color = "#f0f0f0";
        document.getElementById("dark-mode").style.background = "#1a1a1a";

    }
    document.getElementById("website-name").style.color = "white";
}
// Initialize the map
var map = L.map('map').setView([26.8206, 30.8025], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
var marker;
map.on('click', function (e) {
    var lat = e.latlng.lat.toFixed(6);
    var lng = e.latlng.lng.toFixed(6);
    if (marker) {
        marker.setLatLng(e.latlng);
    } else {
        marker = L.marker(e.latlng).addTo(map);
    }
    document.getElementById('coords').innerText =
        `Coordinates: ${lat}, ${lng}`;
    getWeatherData(lat, lng);
    getAirQualityData(lat, lng);
    getSoilData(lat, lng);
});
// Functions to get weather, air quality, and soil type
function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(err => {
            console.error("Error fetching weather:", err);
        });
}
function getAirQualityData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayAirQualityData(data);
        })
        .catch(err => {
            console.error("Error fetching air quality:", err);
        });
}
function getSoilData(lat, lon) {
    fetch(`https://api.openepi.io/soil/type?lat=${lat}&lon=${lon}&top_k=1`)
        .then(res => res.json())
        .then(displaySoilData)
        .catch(err => console.error("Soil type error:", err));

}
// Functions to display data in the dashboard
function displayWeatherData(data) {
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("condition").textContent = data.weather[0].description;
}

function displayAirQualityData(data) {
    const values = data.list[0].components;
    document.getElementById("pm25").textContent = values.pm2_5;
    document.getElementById("pm10").textContent = values.pm10;
    document.getElementById("o3").textContent = values.o3;
}

function displaySoilData(data) {
    document.getElementById("soil-type").textContent =
        data.properties?.most_probable_soil_type ?? "N/A";
}


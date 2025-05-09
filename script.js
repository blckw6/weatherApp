const apiKey = "openweathermap.api";
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.getElementById("weatherInfo");

searchButton.addEventListener("click", () => {
    const city = cityInput.value; 
    if (city) {
        getWeather(city);
    } else {
        alert("Введите город");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
        );
        const data = await response.json();

        if (data.cod == 200) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>Город не найден</p>`;
        }
    } catch (error) {
        console.error("Ошибка:", error); 
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = Math.round(main.temp);
    const description = weather[0].description;
    const icon = weather[0].icon;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Температура: ${temperature}°C</p>
        <p>${description}</p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Погода" class="weather-icon">
    `;
}
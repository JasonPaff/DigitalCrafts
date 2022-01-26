const apiByCityUrl = 'http://api.openweathermap.org/data/2.5/weather?'
const apiByLongLatUrl = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = '4bc94f2afc12e496789ee0829f4ca267'

let cityTextBox = document.getElementById("cityTextBox")
document.getElementById("checkWeatherButton").onclick = () => getWeatherDataFromCityName(cityTextBox.value)

// start the process of displaying weather based on the users location when the page loads
getUserLongLat();

// return the weather data using a city name
function getWeatherDataFromCityName(cityName){
    fetch(`${apiByCityUrl}q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(result => displayWeatherData(result))
}

// return the weather data from a longitdue and latitude
function getWeatherDataFromLongLat(longitude, latitude) {  
    fetch(`${apiByLongLatUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(result => displayWeatherData(result))
}

// display the weather data
function displayWeatherData(weatherData){
    document.getElementById("weatherDisplayDiv").innerHTML = 
    `<ul style='list-style-type: none'>
        <li>City: ${weatherData.name}</li>
        <li>Max Temp: ${weatherData.main.temp_max} degrees</li>
        <li>Min Temp: ${weatherData.main.temp_min} degrees</li>
        <li>Pressure: ${weatherData.main.pressure} atmospheres</li>
    </ul>`
}

// return the longitude and latitude of the user
function getUserLongLat(){
    if ('geolocation' in navigator)
        navigator.geolocation.getCurrentPosition(position => 
            getWeatherDataFromLongLat(position.coords.longitude, position.coords.latitude))
}
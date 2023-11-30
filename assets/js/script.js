console.log("This thing is linked");

// Adding some comments

// function fetchVideo(a) {
//     var queryURL = "https://api.dailymotion.com/videos?ids=" + a;
    
//     fetch(queryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
// }

// fetchVideo(sunny);

// utilizes DailyMotion Library API 
var sunnyVideo = destinationSun[0].video;
console.log(sunnyVideo);
var sunnyCity = destinationSun[0].city;
console.log(sunnyCity);

dailymotion.createPlayer('video-player', {video:sunnyVideo});

// OpenWeather
function fetchWeatherData(sunnyCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + sunnyCity + "&appid=" + APIKey;
    
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        // Weather icon data 
        var weatherIcon = data.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
var weatherIcon = $("<img>").attr("src", iconURL).attr("alt", "Weather Icon").css( {
    'vertical-align': 'middle',
    'margin-right': '5px', 
    'width': '40px',
    'height': '40px'  
});

// Display city 
var city = $("<h2>").text(data.name + " ");
city.append(weatherIcon);

// Display Temp (p)
var celsiusTemp = data.main.temp - 273.15;
var celsiusTemp = $("<p>").text("Temp: " + celsiusTemp.toFixed(2) + " °C");

// Append to today section
$("#city-country-container").append(city).append(celsiusTemp)
})
}

fetchWeatherData(sunnyCity);
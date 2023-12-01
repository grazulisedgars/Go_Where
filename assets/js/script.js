
// Hides 2nd second-screen 
$(document).ready(function () {
    $("#second-screen").hide();
});


// Go back event listener
$("#go-back").on("click", function(event) {
    event.preventDefault();
    $("#second-screen").hide();
    $("#start-screen").show();
    // Perhaps add a line where it clears local storage? Go back = refresh?
})


// Event listener Sunny 
$("#sunny").on("click", function(event) {
    event.preventDefault();
    $("#start-screen").hide();
    $("#second-screen").show();
    $("#city-country-container").empty();
    // Fetches current weather info
    var randomSunnyDestination = getRandomSunnyDestination();
    fetchWeatherData(randomSunnyDestination.city);
    // Fetches current weather info
    dailymotion.createPlayer('video-player', { video: randomSunnyDestination.video});
    // Changes background image
    $("#second-screen").addClass("bg-sunny");
});


// Event listener Snowy
$("#snowy").on("click", function(event) {
    event.preventDefault();
    $("#start-screen").hide();
    $("#second-screen").show();
    $("#city-country-container").empty();
    // Fetches current weather info
    var randomSnowyDestination = getRandomSnowyDestination();
    fetchWeatherData(randomSnowyDestination.city);
    // Fetches current weather info
    dailymotion.createPlayer('video-player', { video: randomSnowyDestination.video});
    // Changes background image
    $("#second-screen").addClass("bg-snowy");
});  


// Function to get a random sunny destination 
function getRandomSunnyDestination() {
    var randomIndex = Math.floor(Math.random() * destinationSun.length);
    return destinationSun[randomIndex];
};


// Function to get a random snowy destination
function getRandomSnowyDestination() {
    var randomIndex1 = Math.floor(Math.random() * destinationSnow.length);
    return destinationSnow[randomIndex1];
};


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
};


// Thumbs Up/ Thumbs Down click events
    var likes = 0;
    var dislikes = 0;

    $("#thumbsUp").on("click", function(event) {
    event.preventDefault();
    likes ++;

    updateLikeDislikeSection();
});

    $("#thumbsDown").on("click", function(event) {
    event.preventDefault();
    dislikes++;

    updateLikeDislikeSection();
});


// Thumbs Up/ Thumbs Down functionality 
function updateLikeDislikeSection() {
    $("#like").text("Likes: ").append(likes);
    $("#dislike").text("Dislikes: ").append(dislikes);
}
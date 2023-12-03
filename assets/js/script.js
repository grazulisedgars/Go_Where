// API Key
destinations = [];
// Hides 2nd second-screen
$(document).ready(function () {
    $("#second-screen").hide();
    // $("#go-back").hide();
    $("header").hide();
});


// Go back event listener
$("#go-back").on("click", function(event) {
    event.preventDefault();
    $("#second-screen").hide();
    $("#start-screen").show();
    // $("#go-back").hide();
    $("header").hide();
    // Perhaps add a line where it clears local storage? Go back = refresh?
})


// Event listener Sunny 
$("#sunny").on("click", function(event) {
    event.preventDefault();
    $("#start-screen").hide();
    $("#second-screen").show();
    $("#city-country-container").empty();
    $("#second-screen").removeClass();
    // $("#go-back").show();
    $("header").show();
    destinations = destinationSun;
    
    randIndex = getRandomIndex();
    randomDestination = destinations[randIndex];;
    console.log(randomDestination);
    destinations.splice(randIndex, 1);
    console.log(destinations);

    fetchWeatherData(randomDestination.city);
    // Fetches current weather info
    dailymotion.createPlayer('video-player', { video: randomDestination.video});
    // Changes background image
    $("#second-screen").addClass("bg-sunny");
});


// Event listener Snowy
$("#snowy").on("click", function(event) {
    event.preventDefault();
    $("#start-screen").hide();
    $("#second-screen").show();
    $("#city-country-container").empty();
    $("#second-screen").removeClass();
    // $("#go-back").show();
    $("header").show();
    destinations = destinationSnow;
    // Fetches current weather info
    randIndex = getRandomIndex();
    randomDestination = destinations[randIndex];;
    console.log(randomDestination);
    destinations.splice(randIndex, 1);
    console.log(destinations);

    fetchWeatherData(randomDestination.city);
    // Fetches current weather info
    dailymotion.createPlayer('video-player', { video: randomDestination.video});
    // Changes background image
    $("#second-screen").addClass("bg-snowy");
});  


// Function to get a random sunny destination 
function getRandomIndex() {
    var randomIndex = Math.floor(Math.random() * destinations.length);
    console.log(randomIndex);
    return randomIndex;
};


// Function to get a random snowy destination
// function getRandomSnowyDestination() {
//     var randomIndex1 = Math.floor(Math.random() * destinationSnow.length);
//     return destinationSnow[randomIndex1];
// };


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
    //create modal for likes
    //problem - modal is addative. need to delete it after it is closed
    //modal is working now with deletion
    $("<div></div>").attr("id", "modalLike").addClass("modal modal-dialog-centered p-5").appendTo("body");
    $("<div></div>").addClass("modal-content").appendTo("#modalLike");
    $("<p></p>").text("A classy choice!").appendTo(".modal-content");
    $("<button></button>").attr("id", "close").text("Close").appendTo(".modal-content");
    $("#modalLike").show();
    $("#close").on("click", function(event) {
        event.preventDefault();
        $("#city-country-container").empty();
        
        
        randIndex = getRandomIndex();
        randomDestination = destinations[randIndex];;
        console.log(randomDestination);
        destinations.splice(randIndex, 1);
        console.log(destinations);


        fetchWeatherData(randomDestination.city);
        dailymotion.createPlayer('video-player', { video: randomDestination.video});
        $("#modalLike").remove();
    });



    updateLikeDislikeSection();
});

    $("#thumbsDown").on("click", function(event) {
    event.preventDefault();
    dislikes++;

    $("<div></div>").attr("id", "modalDislike").addClass("modal modal-dialog-centered p-5").appendTo("body");
    $("<div></div>").addClass("modal-content").appendTo("#modalDislike");
    $("<p></p>").text("Okay, understood!").appendTo(".modal-content");
    $("<button></button>").attr("id", "close").text("Close").appendTo(".modal-content");
    $("#modalDislike").show();
    $("#close").on("click", function(event) {
        event.preventDefault();
        $("#city-country-container").empty();
        
        randIndex = getRandomIndex();
        randomDestination = destinations[randIndex];
        console.log(randomDestination);
        destinations.splice(randIndex, 1);
        console.log(destinations);

        fetchWeatherData(randomDestination.city);
        dailymotion.createPlayer('video-player', { video: randomDestination.video});
        $("#modalDislike").remove();
    });

    updateLikeDislikeSection();
});


// Thumbs Up/ Thumbs Down functionality 
function updateLikeDislikeSection() {
    $("#like").text("Likes: ").append(likes);
    $("#dislike").text("Dislikes: ").append(dislikes);
}


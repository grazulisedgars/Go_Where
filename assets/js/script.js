// API Key
//VARIABLE DECLARATION START---------------------------------------------
/*desinations will be used to store either the sunny or the snowy destinations depending 
on user input. The destinations will be stored in an array of objects.
*/
let destinations = [];

// counter will be used to retrieve items from local storage- it is reset after clicking "go back"
let counter = 0;

// enumerates likes and dislikes respectively
var likes = 0;
var dislikes = 0;

// VARIABLE DECLARATION END--------------------------------------------------

// Hides second screen
$(document).ready(function () {
    $("#second-screen").hide();
    // $("#go-back").hide();
    $("header").hide();
});


// Go back event listener - hides content, reinitialises counters, removes element text
$("#go-back").on("click", function(event) {
    event.preventDefault();
    $("#second-screen").hide();
    $("#start-screen").show();
    // $("#go-back").hide();
    $("header").hide();
    // Perhaps add a line where it clears local storage? Go back = refresh?
    $("#go-back").hide();
    likes = 0;
    dislikes = 0;
    $("#like").text("");
    $("#dislike").text("");
    destinations = [];
});

// Hover Sunny button
$("#sunny").mouseover(function() {
    $("#start-screen").addClass("bg-sunny");
});
$("#sunny").mouseout(function() {
    $("#start-screen").removeClass("bg-sunny");   
});
    
//GO SUNNY START--------------------------------------------------------------------------
// Event listener Sunny 
$("#sunny").on("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    $("#likeList").empty();
    $("#dislikeList").empty();
    $("#likeList").text("Likes: ");
    $("#dislikeList").text("Dislikes: ");

    $("#thumbsUp").show();  
    $("#thumbsDown").show();
  
    counter = 0;
   
   
    // hides start screen, shows second screen
    $("#start-screen").hide();
    $("#second-screen").show();
    $("#city-country-container").empty();
    $("#second-screen").removeClass();

    $("#go-back").show();
    $("header").show();
    // destinations set to equal sunny destinations
    destinations = destinations.concat(destinationSun);

    
    // call to random number function- returning random number between 0 and length of destinations array
    randIndex = getRandomIndex();
    randomDestination = destinations[randIndex];
    console.log(randomDestination);
    destinations.splice(randIndex, 1);
    console.log(destinations);

    // call to fetch weather data function
    fetchWeatherData(randomDestination.city);
    
    dailymotion.createPlayer('video-player', { video: randomDestination.video});
    // Changes background image
    $("#second-screen").addClass("bg-sunny");
});


// Hover Snowy button
$("#snowy").mouseover(function() {
    $("#start-screen").addClass("bg-snowy");
});
$("#snowy").mouseout(function() {
    $("#start-screen").removeClass("bg-snowy");
});

//GO SUNNY END--------------------------------------------------------------------------

//GO SNOWY START--------------------------------------------------------------------------

// Event listener Snowy
$("#snowy").on("click", function(event) {
    event.preventDefault();
    localStorage.clear();

    //clears the like and dislike lists
    $("#likeList").empty();
    $("#dislikeList").empty();
    $("#likeList").text("Likes: ");
    $("#dislikeList").text("Dislikes: ");

    $("#thumbsUp").show();
    $("#thumbsDown").show();
    
    counter = 0;
  
    // hides start screen, shows second screen
    $("#start-screen").hide();
    $("#second-screen").show();
    $("#city-country-container").empty();
    $("#second-screen").removeClass();

    $("#go-back").show();
    $("header").show();
    destinations = destinations.concat(destinationSnow);
    console.log(destinations);

    // Fetches current weather info
    randIndex = getRandomIndex();
    randomDestination = destinations[randIndex];
    console.log(randomDestination);
    destinations.splice(randIndex, 1);
    console.log(destinations);

    // call to fetch weather data function
    fetchWeatherData(randomDestination.city);
    // Fetches current weather info
    dailymotion.createPlayer('video-player', { video: randomDestination.video});
    // Changes background image
    $("#second-screen").addClass("bg-snowy");
});  

//GO SNOWY END--------------------------------------------------------------------------

//OPEN WEATHER START--------------------------------------------------------------------------

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
    'width': '80px',
    'height': '80px'  
});

    // Display city 
    var city = $("<h2>").text(data.name + ", " + randomDestination.country);
    // city.append(weatherIcon);
    // Display Temp (p)
    var celsiusTemp = data.main.temp - 273.15;
    var celsiusTemp = $("<p>").text("Temp: " + celsiusTemp.toFixed(2) + " °C");
    celsiusTemp.append(weatherIcon);
    // Append to today section
    $("#city-country-container").append(city).append(celsiusTemp)
})
};
//OPEN WEATHER END--------------------------------------------------------------------------


// Thumbs Up/ Thumbs Down click events
//USER RESPONSE LIKE FUCNTIONALITY--------------------------------------------------------------------------
    

    $("#thumbsUp").on("click", function(event) {
    event.preventDefault();
    $("#likeList").empty();
    $("#likeList").text("Likes: ");
    //ADD TO LIKE COUNTER
    likes ++;
    randomDestination.userOpinion = "like";
    //SET CURRENT DESTINATION TO LOCAL STORAGE AND SAVE LIKE
    localStorage.setItem(counter, JSON.stringify(randomDestination));
    console.log(counter);
    counter ++;
    //CREATE MODAL FOR LIKES
    $("<div></div>").attr("id", "modalLike").addClass("modal modal-dialog-centered p-5").appendTo("body");
    $("<div></div>").addClass("modal-content").appendTo("#modalLike").css({
        'margin-left': '14%',
        'margin-right': '14%',
        'padding': '10%'
    });
    $("<p></p>").text("A classy choice!").appendTo(".modal-content");
    $("<button></button>").attr("id", "close").text("Close").appendTo(".modal-content").addClass("btn btn-outline-dark").css({
        'margin-left': '30%',
        'margin-right': '30%'
    });
    $("#modalLike").show();
    
    // IF STATEMENT TO POPULATE LIKE LIST
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        console.log(key);
        var value = JSON.parse(localStorage.getItem(i));
        console.log(value + " " + value.city);
        let result =$("<li></li>").text(value.city + ", " + value.country)
        console.log(result);
       
        if(value.userOpinion === "like") {
            $("#likeList").append(result);
        } else {
            continue;
        }
    }

// MODAL CLOSE BUTTON CLICK EVENT - CLOSES MODAL, UPDATES WEATHER, VIDEO, AND COUNTER
    $("#close").on("click", function(event) {
        event.preventDefault();
       
        if(destinations.length > 0) {
        $("#city-country-container").empty();
        randIndex = getRandomIndex();
        randomDestination = destinations[randIndex];

        console.log(randomDestination);
        //AS RANDOM NUMBER IS PROVIDING INDEX, IS USED HERE TO REMOVE DESTINATION FROM ARRAY
        destinations.splice(randIndex, 1);
        console.log(destinations);

        
        fetchWeatherData(randomDestination.city);
        dailymotion.createPlayer('video-player', { video: randomDestination.video});
        $("#modalLike").remove();
        } else {
            //Temporary solution to remove modal and video player when there are no more destinations
            $("#modalLike").remove();
            $("#thumbsUp").hide();
            $("#thumbsDown").hide();
            $("#city-country-container").text("No more destinations!");
        }
      
        
    });
    
    updateLikeDislikeSection();
});

//USER RESPONSE LIKE FUNCTIONALITY END--------------------------------------------------------------------------



//USER RESPONSE DISLIKE FUNCTIONALITY START--------------------------------------------------------------------------

//THUMBS DOWN CLICK EVENT
    $("#thumbsDown").on("click", function(event) {
    event.preventDefault();
    $("#dislikeList").empty();
    $("#dislikeList").text("Dislikes: ");
    //ADD TO DISLIKE COUNTER
    dislikes++;

    //SET CURRENT DESTINATION TO LOCAL STORAGE AND SAVE DISLIKE
    randomDestination.userOpinion = "dislike";
    localStorage.setItem(counter, JSON.stringify(randomDestination));
    console.log(counter);
    counter ++;
//MODAL FOR DISLIKES
$("<div></div>").attr("id", "modalDislike").addClass("modal modal-dialog-centered p-5").appendTo("body");
$("<div></div>").addClass("modal-content").appendTo("#modalDislike").css({
    'margin-left': '14%',
    'margin-right': '14%',
    'padding': '10%'
});
$("<p></p>").text("Okay, understood!").appendTo(".modal-content");
$("<button></button>").attr("id", "close").text("Close").appendTo(".modal-content").addClass("btn btn-outline-dark").css({
    'margin-left': '30%',
    'margin-right': '30%'
});
$("#modalDislike").show();
//FOR LOOP TO POPULATE DISLIKE LIST
    for(var j = 0; j < localStorage.length; j++) {
     
        var key = localStorage.key(j);
        console.log(key);
        var value = JSON.parse(localStorage.getItem(j));
        console.log(value + " " + value.city);
        let result = $("<li></li>").text(value.city + ", " + value.country)
        console.log(result);

        if(value.userOpinion === "dislike") {
            $("#dislikeList").append(result);
        } else {
            console.log("no dislikes");
        }
    }


// CLICK EVENT FOR MODAL CLOSE BUTTON - CLOSES MODAL, UPDATES WEATHER, VIDEO, AND COUNTER
    $("#close").on("click", function(event) {
        event.preventDefault();
        if(destinations.length > 0) {
        $("#city-country-container").empty();
        
        randIndex = getRandomIndex();
        randomDestination = destinations[randIndex];
        console.log(randomDestination);
        //AS RANDOM NUMBER IS PROVIDING INDEX, IS USED HERE TO REMOVE DESTINATION FROM ARRAY
        destinations.splice(randIndex, 1);
        console.log(destinations);

      

        fetchWeatherData(randomDestination.city);
        dailymotion.createPlayer('video-player', { video: randomDestination.video});
        $("#modalDislike").remove();
        
        } else {
            //Temporary solution to remove modal and video player when there are no more destinations
            $("#modalDislike").remove();
            $("#thumbsUp").hide();
            $("#thumbsDown").hide();
            $("#city-country-container").text("No more destinations!");
            console.log(snowyDestinations);
        }
        // adding disliked destinations to the disliked list
       
    });
    updateLikeDislikeSection();
});


//USER RESPONSE DISLIKE FUNCTIONALITY END--------------------------------------------------------------------------


//FUNCTIONS START--------------------------------------------------------------------------
// Thumbs Up/ Thumbs Down functionality 
function updateLikeDislikeSection() {
    $("#like").text("Likes: ").append(likes);
    $("#dislike").text("Dislikes: ").append(dislikes);
}

function getRandomIndex() {
    var randomIndex = Math.floor(Math.random() * destinations.length);
    console.log(randomIndex);
    return randomIndex;
};

//FUNCTIONS END--------------------------------------------------------------------------

console.log("This thing is linked");

// Adding some comments

function fetchVideo(a) {
    var queryURL = "https://api.dailymotion.com/videos?ids=" + a;
    
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

fetchVideo(sunny);
var sunny = destinationSun[0].video;
console.log(sunny);
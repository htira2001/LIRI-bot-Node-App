// Set up the environment variables //
require("dotenv").config();

// Import the keys.js file and sets it as a variable // 
var keys = require("./keys.js"); 
// console.log(keys);

// Import fs package //
var fs = require("fs");

// Import Twitter //
var Twitter = require("twitter"); 

// Import Spotify //
var Spotify = require('node-spotify-api');
var spotifyClient = new Spotify(keys.spotifyKeys);

// Import request.npm package //
var request = require("request");

// Request will be used to grab data from the OMDB API //

//======================================================================//
    
// Deciding which functions to call, based on the user input //
function runLiri(commandOne, commandTwo) {

    switch(commandOne) {
        case "my-tweets":
            getTweets(); 
            break; 

        case "spotify-this-song":
            console.log("Your chosen song info: " + commandTwo);
            getSpotify(commandTwo);
            break; 

        case "movie-this":
            console.log("Your chosen movie info: " + commandTwo);
            getMovie(commandTwo); 
            break; 
        
        case "do-what-it-says":
            console.log("Do what it says: ");
            doIt();
            break; 
        default:
            console.log("Sorry, LIRI doesn't know that. Please enter a command such as 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'");
    }
};

    runLiri(process.argv[2], process.argv[3]);
   
// Twitter Functionality //

// This was done following the documentation of the Twitter npm package //
function getTweets () {
    var twitterClient = new Twitter(keys.twitterKeys);
    var params = {
        screen_name: 'mariamschaudry7',
        count: '20'
    }
twitterClient.get("statuses/user_timeline", params, function(error, tweets) {
    if (error) { 
       console.log("There seems to be an error: " + JSON.stringify(error));
} 
   if(tweets) {
      for (var i = 0; i < tweets.length; i++) {
           console.log("-----------------------------------");
           console.log("Here are some of my most recent tweets: " + tweets[i].created_at + ":"); 
           console.log(tweets[i].text);
           console.log("-----------------------------------");
        };
     }
 });

};

// Spotify Functionality //

function getSpotify (songName) {
    if (songName === null) {
        songName = "the sign"
    }
    spotifyClient.search({
        type: 'track',
        query: songName,
        limit: 1
    },
    function(err, data) {
        // console.log(err);
        // console.log("This is the data:" + data);
    if(err) {
       return console.log("There was an error: " + err);
    } else {
        console.log(data);
        var songTitle = data.tracks.items[0].name;
        var songArtist = data.tracks.items[0].artists[0].name;
        var songAlbum = data.tracks.items[0].album.name;
        var preview_url = data.tracks.items[0].preview_url;
    
        console.log("------------*Spotify Results*------------");
        console.log("Artists: " + JSON.stringify(songArtist));
        console.log("Album: " + songAlbum);
        console.log("Song Title: " + songTitle);
        console.log("Spotify Preview: " + previewURL);
        console.log("-----------------------------------------");
    }
}

)};

// OMDB Functionality //

function getMovie(movieName) {
    var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request (omdbURL, function(error, response, body) {
  if (!error) {

    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The title of the movie is: " +JSON.parse(body).Title);
    console.log("The IMDB Rating of the movie is: " +JSON.parse(body).imdbRating);
    console.log("The Rotten Tomatoes Rating of the movie is: " +JSON.parse(body).Ratings[1].Value);
    console.log("The country where the movie was produced is: " +JSON.parse(body).Country);
    console.log("The language of the movie is " +JSON.parse(body).Language);
    console.log("This is the plot of the movie: " +JSON.parse(body).Plot);
    console.log("The actors in the movie are: " +JSON.parse(body).Actors);

        };
    });
};

function doIt(){
    fs.readFile('random.txt','utf8',function(err,data){
        data = data.split(",");
        userInput = data[0];
        songTitle = data[1];
    
        if(userInput === "spotify-this-song" && songTitle === "undefined"){
                getSpotify("Thriller")
        } else if (userInput === "spotify-this-song"){
                getSpotify(songTitle);
        }
});
};
        
        
        
        
        
        
        
        
        
        
//         if (err) {return console.log(err)}
//         var readFileArr = data.split(',');
//         userInput = readFileArr[1].split(' ');
//     runLiri();
//     });
// };




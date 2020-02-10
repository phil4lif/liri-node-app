require("dotenv").config();

var keys = require("./keys.js");
var axios =  require("axios");
var moment = require("moment");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

function concertThis(){
var artist = process.argv.slice(3).join(" ");
console.log(artist);
var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp"
axios.get(queryUrl).then(
    function(response) {
        var results = response.data
        for (var i = 0; i < results.length; i++){
            var venueName = results[i].venue.name;
            var venueLoc = results[i].venue.city
            var date = results[i].datetime
            console.log(venueName+" "+venueLoc+" "+ moment(date).format("MM/DD/YYYY"))
        }

    })
}   
function movieThis(){
    var movieName = process.argv.slice(3).join(" ");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl).then(
        function(response) {
            var results = response.data
            console.log(results)
        }
    )

}
// function spotifyThis(){
//     var song = process.argv[3];
//     var queryUrl = 
// }
switch (command) {
    case 'concert-this':
        concertThis();
      break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        movieThis();
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:
      console.log('Sorry, we are out of ' + expr + '.');
  }
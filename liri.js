require("dotenv").config();

var keys = require("./keys.js");
var axios =  require("axios");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

function concertThis(){
var artist = process.argv[3]

var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp"
axios.get(queryUrl).then(
    function(response) {
        var results = response.data
        for (var i = 0; i < results.length; i++){
            var venueName = results[i].venue.name;
            var venueLoc = results[i].venue.city
            var date = results[i].datetime
            console.log(venueName+" "+venueLoc+" "+date)
        }
        // console.log(results[1])
        // console.log(results)
    //   var results=response.data
    //   console.log(results.Year);
    })
}
// function spotifyThis(){
//     var song = process.argv[3];
//     var queryUrl = 
// }
switch (command) {
    case 'concert-this':
        concertThis()
      console.log('concert this');
      break;
    case 'spotify-this-song':
        console.log("spotify this")
        break;
    case 'movie-this':
      console.log('Movie this');
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:
      console.log('Sorry, we are out of ' + expr + '.');
  }
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2];
var searchText = process.argv.slice(3).join(" ");
function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchText + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function (response) {
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var venueName = results[i].venue.name;
                var venueLoc = results[i].venue.city + ", " + results[i].venue.country
                var date = results[i].datetime
                console.log(venueName + " \n" + venueLoc + " \n" + moment(date).format("MM/DD/YYYY"))
                console.log("___________________________\n")
            }
            if (results.length === 0) {
                console.log("This Band is not on tour")
            }


        })
}
function spotifyThis() {
    var Spotify = require("node-spotify-api")

    var spotify = new Spotify(keys.spotify);

    // console.log(song);
    if (searchText.length === 0) {
        searchText = "The Sign"
    }
    spotify
        .search({ type: 'track', query: searchText })
        .then(function (response) {
            // console.log(response);
            var results = (response.tracks.items)
            // console.log(results)
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].album.artists[0].name)
                console.log(results[i].name)
                console.log(results[i].preview_url)
                console.log(results[i].album.name)
                console.log("\n________________________________\n")
            }
            if (results.length === 0) {
                console.log("Can not find this song, double check the title")
            }
        })
        .catch(function (err) {
            console.log(err);
        });

}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        command = dataArr[0];
        searchText = dataArr[1];
        menu()
    })

}

function movieThis() {
    if (searchText.length === 0) {
        searchText = "Mr Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + searchText + "&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl).then(
        function (response) {

            var results = response.data
            // console.log(results)
            if (results.Title != undefined) {
                console.log("Title:" + results.Title)
                console.log("Release Year:" + results.Year)
                console.log("IMDB Rating:" + results.imdbRating)
                console.log(results.Ratings[1].Source + ": " + results.Ratings[1].Value)
                console.log("Country:" + results.Country)
                console.log("Languages:" + results.Language)
                console.log("Plot:" + results.Plot)
                console.log("Cast:" + results.Actors)
            } else {
                console.log("Can not retrieve this movie")
            }
        }
    )

}
// function spotifyThis(){
//     var song = process.argv[3];
//     var queryUrl = 
// }

function menu() {
    switch (command) {
        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song':
            spotifyThis();
            break;
        case 'movie-this':
            movieThis();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
    }
}
menu()
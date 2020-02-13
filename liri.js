var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2];
var searchText = process.argv.slice(3).join(" ");
var log = "\n" + command +" "+ searchText + "\n____________\n"
function concertThis() {
    fs.appendFile("log.txt", log, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("command and search text logged")
        }
    })
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
                var logResults = venueName + " \n" + venueLoc + " \n" + moment(date).format("MM/DD/YYYY") + "\n"
                fs.appendFile("log.txt", logResults, function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        // console.log("results logged")
                    }
                })
            }                


            if (results.length === 0) {
                console.log("This Band is not on tour")
            }


        })
}
function spotifyThis() {
    var Spotify = require("node-spotify-api")

    var spotify = new Spotify(keys.spotify);
    fs.appendFile("log.txt", log, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("command and search text logged")
        }
    })

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
                var artists = results[i].album.artists[0].name;
                var name = results[i].name;
                var preview = results[i].preview_url;
                var album = results[i].album.name;
                console.log(artists)
                console.log(name)
                console.log(preview)
                console.log(album)
                console.log("\n________________________________\n")
                var logResults = artists + " \n" + name + " \n" + preview + "\n" + album + "\n"
                fs.appendFile("log.txt", logResults, function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        // console.log("results logged")
                    }
                })
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
    fs.appendFile("log.txt", log, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("command and search text logged")
        }
    })
    if (searchText.length === 0) {
        searchText = "Mr Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + searchText + "&y=&plot=short&apikey=trilogy"
    axios.get(queryUrl).then(
        function (response) {

            var results = response.data
            // console.log(results)
            if (results.Title != undefined) {
                var title = "Title: " + results.Title;
                var year = "Release Year: " + results.Year;
                var imdbRating = "IMDB Rating: " + results.imdbRating;
                var rtRating = results.Ratings[1].Source + ": " + results.Ratings[1].Value;
                var country = "Country: " + results.Country;
                var languages = "Languages: " + results.Language;
                var plot = "Plot: " + results.Plot;
                var cast = "Cast: " + results.Actors
                console.log(title)
                console.log(year)
                console.log(imdbRating)
                console.log(rtRating)
                console.log(country)
                console.log(languages)
                console.log(plot)
                console.log(cast)
                var logResults = title + " \n" + year + " \n" + imdbRating + "\n" + rtRating + "\n" + country +"\n" + languages + "\n" + plot + "\n" + cast
                fs.appendFile("log.txt", logResults, function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        // console.log("results logged")
                    }
                })
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
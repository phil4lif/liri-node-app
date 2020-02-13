# liri-node-app

This is a node app that allows the user to input one of four commands.

1 movie-this "name of movie"
If the user inputs movie-this followed by a movie title the app will use axios to get the movie from the omdb api and it will console log some information about the movie.

2 concert-this "name of band"
If the user inputs concert-this followed by the name of a band the app will use axios to console log a list of details of the bands upcoming shows.
3 spotify-this-song "name of song"
If the user inputs spotify-this-song followed by the name of a song the app will conduct a spotify search and console log a list of songs that fit the search.
4 do-what-it-says
When the user inputs do-what-it-says the app will read the random.txt file and run whatever command and search query that is listed in that file.

In addition to the console, the results will be appended to the log.txt file.


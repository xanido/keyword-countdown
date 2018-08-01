import imdb from "omdb-client"
import "./app"

var response = imdb.get({title: "Raiders of the Lost Ark", apiKey: "d622264f"}, (err, data) => console.log(data) )


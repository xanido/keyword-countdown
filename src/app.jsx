import React from "react";
import ReactDOM from "react-dom";

import TitleSearch from "./components/titlesearch";
import omdb        from "./omdb"
import imdb        from "./imdb"


class KCApp extends React.Component {
  render() {
        return (<div><TitleSearch /></div>)
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<KCApp />, mountNode);

omdb.get({title: "Raiders of the Lost Ark", apiKey: "d622264f"})
    .then(data => imdb.keywords(data.imdbID))
    .then(keywords => console.log(keywords))
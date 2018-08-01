import React from "react";
import ReactDOM from "react-dom";

import TitleSearch from "./components/titlesearch";

class KCApp extends React.Component {
  render() {
        return (<div><TitleSearch /></div>)
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<KCApp />, mountNode);

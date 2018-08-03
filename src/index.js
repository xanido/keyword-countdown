import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/scss/bootstrap.scss';

import ReactDOM   from "react-dom"
import React      from "react"
import omdb       from "./omdb"
import {isValid}  from "./state/schema"

import KCApp from "./app"

omdb.setApiKey(process.env.OMDB_API_KEY);

let initialState = {}

const mountNode = document.getElementById("app");
ReactDOM.render(<KCApp initialState={initialState} />, mountNode);
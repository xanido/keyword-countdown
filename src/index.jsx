import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/scss/bootstrap.scss';

import ReactDOM     from 'react-dom';
import React        from 'react';
import log          from './util/log';
import omdb         from './datasources/omdb';
import moviedb      from './datasources';
import { getState } from './state/storage';
import isValid      from './state/schema';

import KCApp from './app';

moviedb.setEndpointBackend("search", "omdb");
moviedb.setEndpointBackend("title", "omdb");
moviedb.setEndpointBackend("keywords", "imdb");
moviedb.setBackendApiKey("omdb", process.env.OMDB_API_KEY);

let initialState = {};
try {
  const state = getState();
  initialState = state && isValid(state) ? state.data : {};
} catch (err) {
  log(`Failed to load state. Resetting to default state. Error message from state storage engine was: ${err.message}`);
}

const mountNode = document.getElementById('app');
ReactDOM.render(<KCApp initialState={initialState} />, mountNode);

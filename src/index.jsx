import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/scss/bootstrap.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import log from './util/log';
import omdb from './omdb';
import { getState } from './state/storage';
import isValid from './state/schema';

import KCApp from './app';

omdb.setApiKey(process.env.OMDB_API_KEY);

let initialState = {};
try {
  const state = getState();
  initialState = state && isValid(state) ? state.data : {};
} catch (err) {
  log(`Failed to load state. Resetting to default state. Error message from state storage engine was: ${err.message}`);
}

const mountNode = document.getElementById('app');
ReactDOM.render(<KCApp initialState={initialState} />, mountNode);

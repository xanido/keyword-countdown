import { keywords as imdbKeywords } from './imdb';
import { keywords as tmdbKeywords } from './tmdb';

import imdb from './imdb';
import tmdb from './tmdb';
import omdb from './omdb';

let source = 'imdb';

const backends = {
  imdb,
  tmdb,
  omdb,
};

const callBackend = (endpoint, ...args) => {
  const backendSpecified = endpointBackends.hasOwnProperty(endpoint);
  const backendName = backendSpecified ? endpointBackends[endpoint] : 'imdb';
  const backend = backends[backendName];

  if(typeof backend[endpoint] !== 'function') {
    throw Error("Backend " + backend + " does not support " + endpoint);
  }

  return backend[endpoint].apply(null, args);
};

const api = {
  getKeywords: id => callBackend('keywords', id),
  getTitle: id => callBackend('title', id),
  searchTitles: terms => callBackend('search', terms),
};

const endpointBackends = {};
Object.keys(api).map(endpoint => endpointBackends[endpoint] = imdb);

const setEndpointBackend = (endpoint, backend) => {
  endpointBackends[endpoint] = backend;
};

export default {
  setEndpointBackend,
  api,
}
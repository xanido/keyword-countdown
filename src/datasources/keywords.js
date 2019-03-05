import imdb from './imdb';
import tmdb from './tmdb';
import omdb from './omdb';

const defaultBackend = 'omdb';

const backends = {
  imdb,
  tmdb,
  omdb,
};

const endpointBackends = {};

const callBackend = (endpoint, ...args) => {
  const backendSpecified = Object.hasOwnProperty.call(endpointBackends, endpoint);
  const backendName = backendSpecified ? endpointBackends[endpoint] : defaultBackend;
  const backend = backends[backendName];

  if (typeof backend[endpoint] !== 'function') {
    throw Error(`Backend ${backend} does not support ${endpoint}`);
  }

  return backend[endpoint].apply(null, args);
};

const api = {
  getKeywords: id => callBackend('keywords', id),
  getTitle: id => callBackend('title', id),
  searchTitles: terms => callBackend('search', terms),
};

Object.keys(api).map((endpoint) => { endpointBackends[endpoint] = imdb; return imdb; });

const setEndpointBackend = (endpoint, backend) => {
  endpointBackends[endpoint] = backend;
};

export default {
  setEndpointBackend,
  api,
};

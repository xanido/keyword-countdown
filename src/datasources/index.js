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

const getBackend = (endpoint) => {
  const backendSpecified = Object.hasOwnProperty.call(endpointBackends, endpoint);
  const backendName = backendSpecified ? endpointBackends[endpoint] : defaultBackend;

  return backends[backendName];
};

const callBackend = (endpoint, ...args) => {
  const backend = getBackend(endpoint);

  if (typeof backend[endpoint] !== 'function') {
    throw Error(`Backend ${backend} does not support ${endpoint}`);
  }

  return backend[endpoint].apply(null, args);
};

const api = {
  getKeywords: id => callBackend('keywords', id),
  getTitle: id => callBackend('title', id),
  searchTitles: terms => callBackend('search', terms),
  setBackendApiKey: (backend, key) => { backends[backend].setApiKey(key); },
};

Object.keys(api).map((endpoint) => { endpointBackends[endpoint] = imdb; return imdb; });

const setEndpointBackend = (endpoint, backend) => {
  endpointBackends[endpoint] = backend;
};

export default {
  setEndpointBackend,
  getKeywords: api.getKeywords,
  getTitle: api.getTitle,
  searchTitles: api.searchTitles,
  setBackendApiKey: api.setBackendApiKey,
};

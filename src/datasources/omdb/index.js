import omdb      from 'omdb-client';
import promisify from '../../util/promisify';

let apiKey;

const injectapikey = fn => (
  params => (
    fn.call(null, { ...params, apiKey })
  )
);

/**
 * Expose the omdb API as a promise-based API
 */
export default {
  title: injectapikey(promisify(omdb.get)),
  search: injectapikey(promisify(omdb.search)),
  setApiKey: (newKey) => { apiKey = newKey; },
};

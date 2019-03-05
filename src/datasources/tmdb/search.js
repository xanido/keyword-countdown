import Tmdb    from 'moviedb-promise';
import memoize from '../../cache/index';

const apiKey = process.env.TMDB_API_KEY;

const moviedb = new Tmdb(apiKey);

const search = (function tmdbSearch(imdbID) {
  return moviedb.find({ id: imdbID, external_source: 'imdb_id' })
    .then(res => (
      res.movie_results
    ));
});

export default memoize(search);

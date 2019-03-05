import Tmdb    from 'moviedb-promise';
import memoize from '../../cache/index';

const apiKey = process.env.TMDB_API_KEY;

const moviedb = new Tmdb(apiKey);

const keywords = (function tmdbKeywords(imdbID) {
  return moviedb.find({ id: imdbID, external_source: 'imdb_id' })
    .then(res => (
      res.movie_results[0].id
    ))
    .then(id => (
      moviedb.movieKeywords({ id })
    ))
    .then(res => (
      res.keywords.map(keyword => keyword.name)
    ));
});

export default memoize(keywords);

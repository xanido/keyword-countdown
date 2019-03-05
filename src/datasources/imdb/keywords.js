import fetchJsonp from 'fetch-jsonp';
import memoize from '../../cache/index';

const xorigin = url => `http://www.whateverorigin.org/get?url=${encodeURIComponent(url)}`;

const keywords = (function keywords(imdbID) {
  return fetchJsonp(xorigin(`https://www.imdb.com/title/${imdbID}/keywords`))
    .then(response => response.json())
    .then((html) => {
      let m = '';
      const re = /<div class="sodatext">\s*<a href=".*?"\s*>(.*?)<\/a>/g;
      const foundKeywords = [];

      /* eslint-disable-next-line no-cond-assign */
      while (m = re.exec(html.contents)) {
        foundKeywords.push(m[1]);
      }

      return foundKeywords;
    });
});

export default memoize(keywords);

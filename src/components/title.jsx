import React from 'react';
import PropTypes from 'prop-types';
import omdb from '../omdb';
import imdb from '../imdb';
import Keyword from './keyword';
import log from '../util/log';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdb: {},
      keywords: [],
      expanded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { title } = this.props;
    if (prevProps.title !== title) {
      this.fetchData();
    }
  }

  handleTitleClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  handleKeywordClick = (event) => {
    const { onKeywordClick } = this.props;
    onKeywordClick(event.target.childNodes[0].nodeValue);
  }

  // shouldn't be here, should move up the chain
  fetchData() {
    const { title } = this.props;
    omdb.get({ title })
      .then((data) => {
        this.setState({ imdb: data });
        return data;
      })
      .then(data => imdb.keywords(data.imdbID))
      .then((keywords) => { log(keywords); return keywords; })
      .then((keywords) => { this.setState({ keywords }); });
  }

  render() {
    const { keywords, imdb: movieData, expanded } = this.state;
    const { title, selectedKeywords } = this.props;
    if (movieData) {
      return (
        <React.Fragment>
          <h1 onClick={this.handleTitleClick}>
            {title}
          </h1>
          {expanded && (
            <React.Fragment>
              <img src={movieData.Poster} alt={title} />
              <div className="row">
                {keywords.map(keyword => (
                  <Keyword
                    selected={selectedKeywords.indexOf(keyword) !== -1}
                    onClick={this.handleKeywordClick}
                  >
                    {keyword}
                  </Keyword>
                ))}
              </div>
            </React.Fragment>
          )
          }
        </React.Fragment>
      );
    }
    return null;
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  onKeywordClick: PropTypes.func,
  selectedKeywords: PropTypes.arrayOf(PropTypes.string),
};

Title.defaultProps = {
  onKeywordClick: () => {},
  selectedKeywords: [],
};

export default Title;

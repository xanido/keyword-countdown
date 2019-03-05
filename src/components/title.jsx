import React                    from 'react';
import PropTypes                from 'prop-types';
import {SlideDown}              from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';
import omdb                     from '../datasources/omdb';
import moviedb from '../datasources/keywords';
import Keyword                  from './keyword';
import Poster                   from './poster';
import log                      from '../util/log';
import styles                   from './title.scss';
import SortableKeywords         from "./sortablekeywords"

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

  handleKeywordSort = (keywords) => {
    this.props.onKeywordSort(keywords);
  }

  // shouldn't be here, should move up the chain
  fetchData() {
    const { title } = this.props;
    moviedb.api.getTitle({ title })
      .then((data) => {
        this.setState({ imdb: data });
        return data;
      })
      .then(data => moviedb.api.getKeywords(data.imdbID))
      .then((keywords) => { log(keywords); return keywords; })
      .then((keywords) => { this.setState({ keywords }); });
  }

  render() {
    const { keywords, imdb: movieData, expanded } = this.state;
    const { title, selectedKeywords } = this.props;
    if (movieData) {
      return (
        <div className={styles.title}>
          <Poster movieData={movieData} onClick={this.handleTitleClick} />
          <SlideDown closed={!expanded}>
            <div className={styles.titleDetails}>
              <h1>
                {title}
              </h1>
              <div className="row">
                {keywords.map(keyword => (
                  <Keyword
                    key={keyword}
                    selected={selectedKeywords.indexOf(keyword) !== -1}
                    onClick={this.handleKeywordClick}
                  >
                    {keyword}
                  </Keyword>
                ))}
              </div>
            </div>
          </SlideDown>
          <SortableKeywords keywords={selectedKeywords} onSort={this.handleKeywordSort}/>

        </div>
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

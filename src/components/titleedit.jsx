import React            from 'react';
import PropTypes        from 'prop-types';
import {SlideDown}      from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';
import omdb             from '../datasources/omdb';
import moviedb          from '../datasources';
import Keyword          from './keyword';
import Poster           from './poster';
import log              from '../util/log';
import styles           from './title.scss';
import SortableKeywords from "./sortablekeywords"
import classNames from "classnames";

class TitleEdit extends React.Component {
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
      //this.setState({keywords: []})
      this.fetchData();
    }
  }

  handleTitleClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  handleKeywordClick = (event) => {
    const { onKeywordClick } = this.props;
    onKeywordClick(this.props.title, event.target.childNodes[0].nodeValue);
  }

  handleKeywordSort = (keywords) => {
    this.props.onKeywordSort(this.props.title, keywords);
  }

  // shouldn't be here, should move up the chain
  fetchData() {
    const { title } = this.props;
    moviedb.getTitle({ id: title.id })
      .then((data) => {
        this.setState({ imdb: data });
        return data;
      })
      .then(data => moviedb.getKeywords(data.imdbID))
      .then((keywords) => { log(keywords); return keywords; })
      .then((keywords) => { this.setState({ keywords }); });
  }

  render() {
    const { keywords, imdb: movieData, expanded } = this.state;
    const { title, selectedKeywords } = this.props;

    if (movieData) {
      return (
        <div className={styles.titleDetails}>
          <h1>
            {title.label}
          </h1>
          <div className="row">
            <div className="col-sm-4">
              <SortableKeywords keywords={selectedKeywords} onSort={this.handleKeywordSort}/>
            </div>
            <div className="col-sm-8">
              <div className={"row"}>
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
          </div>
        </div>
      );
    }
    return null;
  }
}

TitleEdit.propTypes = {
  title: PropTypes.object.isRequired,
  onKeywordClick: PropTypes.func,
  selectedKeywords: PropTypes.arrayOf(PropTypes.string),
};

TitleEdit.defaultProps = {
  onKeywordClick: () => {},
  selectedKeywords: [],
};

export default TitleEdit;

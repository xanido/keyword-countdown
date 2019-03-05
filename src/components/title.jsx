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

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imdb: {},
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

  // shouldn't be here, should move up the chain
  fetchData() {
    const { title } = this.props;
    moviedb.getTitle({ title })
      .then((data) => {
        this.setState({ imdb: data });
        return data;
      });
  }

  render() {
    const { imdb: movieData } = this.state;

    const classes = classNames([
      styles.title,
      { [styles.selected]: this.props.selected }
    ]);

    if (movieData) {
      return (
        <div className={classes}>
          <Poster movieData={movieData} onClick={this.handleTitleClick} />
        </div>
      );
    }
    return null;
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

Title.defaultProps = {

};

export default Title;

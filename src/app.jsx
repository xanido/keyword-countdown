import React from 'react';
import PropTypes from 'prop-types';
import TitleSearch from './components/titlesearch';
import Title from './components/title';
import './util/array.unique';
import { saveState } from './state/storage';

class KCApp extends React.Component {
  constructor(props) {
    super(props);
    if ((typeof props.initialState === 'object') && Object.keys(props.initialState).length !== 0) {
      this.state = props.initialState;
    }
  }

  state = {
    titles: [],
    keywordsByTitle: {},
  }

  onChange = (options) => {
    this.setState(prevState => ({
      titles: [...prevState.titles, ...options].unique(),
    }), () => {
      this.persistState();
    });
  }

  handleKeywordClick = (title, keyword) => {
    const { keywordsByTitle } = this.state;
    const keywords = keywordsByTitle[title.id] || [];
    const keywordIndex = keywords.indexOf(keyword);

    if (keywordIndex === -1) {
      keywords.push(keyword);
    } else {
      keywords.splice(keywordIndex, 1);
    }

    this.setState({
      keywordsByTitle: { ...keywordsByTitle, [title.id]: keywords },
    }, () => {
      this.persistState();
    });
  }

  persistState = () => {
    saveState(this.state);
  }

  render() {
    const { titles, keywordsByTitle } = this.state;
    return (
      <div>
        <TitleSearch onChange={this.onChange} />
        {titles.map(title => (
          <Title
            title={title.label}
            onKeywordClick={keyword => this.handleKeywordClick(title, keyword)}
            selectedKeywords={keywordsByTitle[title.id] || []}
          />
        ))}
      </div>
    );
  }
}

KCApp.propTypes = {
  initialState: PropTypes.shape({
    titles: PropTypes.arrayOf(PropTypes.string),
    keywordsByTitle: PropTypes.objectOf(PropTypes.string),
  }),
};

KCApp.defaultProps = {
  initialState: {},
};

export default KCApp;

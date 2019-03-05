import React         from 'react';
import PropTypes     from 'prop-types';
import TitleSearch   from './components/titlesearch';
import Title         from './components/title';
import './util/array.unique';
import { saveState } from './state/storage';
import Description   from "./components/description"
import styles from "./app.scss"

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
    description: '',
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

  handleKeywordSort = (title, keywords) => {
    const { keywordsByTitle } = this.state;
    this.setState({
      keywordsByTitle: { ...keywordsByTitle, [title.id]: keywords },
    }, () => {
      this.persistState();
    });
  }

  handleDescriptionChange = (description) => {
    this.setState({ description }, this.persistState);
  }

  persistState = () => {
    saveState(this.state);
  }

  render() {
    const { titles, keywordsByTitle, description } = this.state;
    return (
      <div>
        <TitleSearch onChange={this.onChange} />
        <div className={styles.titles}>
          {titles.map(title => (
            <Title
              key={title.id}
              title={title.label}
              onKeywordClick={keyword => this.handleKeywordClick(title, keyword)}
              onKeywordSort={keywords => this.handleKeywordSort(title, keywords)}
              selectedKeywords={keywordsByTitle[title.id] || []}
            />
          ))}
        </div>
        <Description value={description} onChange={this.handleDescriptionChange} />
      </div>
    );
  }
}

KCApp.propTypes = {
  initialState: PropTypes.shape({
    titles: PropTypes.arrayOf(PropTypes.object),
    keywordsByTitle: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    description: PropTypes.string,
  }),
};

KCApp.defaultProps = {
  initialState: {},
};

export default KCApp;

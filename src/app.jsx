import React         from 'react';
import PropTypes     from 'prop-types';
import AppHeader     from "./components/appheader";
import TitleSearch   from './components/titlesearch';
import TitleWell     from './components/titlewell';
import Title         from './components/title';
import TitleEdit     from './components/titleedit';
import './util/array.unique';
import { saveState } from './state/storage';
import Description   from "./components/description"
import styles        from "./app.scss"
import {MemoryRouter as Router} from "react-router";
import {Route, Switch, BrowserRouter}       from "react-router-dom"

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
      <Router>
        <Route
          path={["/edit/:id", "/"]}
          render={props => (
            <div>
              <AppHeader />
              <TitleWell
                {...{ titles, keywordsByTitle }}
                onKeywordClick={this.handleKeywordClick}
                onKeywordSort={this.handleKeywordSort}
              />
              <TitleSearch onChange={this.onChange} />
              <Description value={description} onChange={this.handleDescriptionChange} />
              <Switch>
                <Route
                  path={"/edit/:id"}
                  render={props => {
                    const title = titles.filter(title => title.id === props.match.params.id)[0];
                    if(!title) return null;
                    return <TitleEdit
                      title={title}
                      onKeywordClick={this.handleKeywordClick}
                      onKeywordSort={this.handleKeywordSort}
                      selectedKeywords={keywordsByTitle[props.match.params.id]}
                    />
                  }}
                />
              </Switch>
            </div>
          )}
        />

      </Router>
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

import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import omdb from '../omdb';

// stub
class TitleSearch extends React.Component {
  state = {
    allowNew: false,
    isLoading: false,
    multiple: false,
    options: [],
  };

  handleSearch = (query) => {
    this.setState({ isLoading: true });
    omdb
      .search({ query })
      .then(({ Search: results }) => {
        this.setState({
          isLoading: false,
          options: results.map(result => ({
            label: result.Title,
            id: result.imdbID,
          })),
        });
      });
  }

  render() {
    return (
      <AsyncTypeahead
        {...this.state}
        minLength={3}
        onSearch={this.handleSearch}
        placeholder="Search for a movie..."
        selectHintOnEnter
        {...this.props}
      />
    );
  }
}

export default TitleSearch;

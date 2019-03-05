import React              from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import omdb               from '../datasources/omdb';
import TitleSearchItem    from "./titlesearchitem"

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
            poster: result.Poster,
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
        renderMenuItemChildren={(option, props) => (
          <TitleSearchItem key={option.id} title={option} />
        )}
        ref={ref => this._typeahead = ref}
        onChange={options => {
          this._typeahead.getInstance().clear();
          this.props.onChange(options);
        }}

      />
    );
  }
}

export default TitleSearch;

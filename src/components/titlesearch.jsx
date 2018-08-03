import React from "react"
import omdb from "../omdb"
import {AsyncTypeahead} from "react-bootstrap-typeahead"

// stub
class TitleSearch extends React.Component {
    state = {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
    };

    render() {
        return (
            <React.Fragment>
                <AsyncTypeahead
                    {...this.state}
                    minLength={3}
                    onSearch={this._handleSearch}
                    placeholder="Search for a movie..."
                    selectHintOnEnter={true}
                    {...this.props}
                />
            </React.Fragment>
        );
    }

    _handleChange = (e) => {
        const {checked, name} = e.target;
        this.setState({[name]: checked});
    }

    _handleSearch = (query) => {
        this.setState({isLoading: true});
        omdb.search({query})
            .then(({Search}) => {
                this.setState({
                    isLoading: false,
                    options: Search.map(result => ({label: result.Title, id: result.imdbID})),
                });
            });
    }
}

export default TitleSearch
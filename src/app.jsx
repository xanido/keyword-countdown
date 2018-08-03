import React from "react";
import TitleSearch from "./components/titlesearch";
import Title from "./components/title";
import "./util/array.unique"

class KCApp extends React.Component {
    state = {
        titles: [],
        keywordsByTitle: {},
    }

    constructor(props) {
        super(props)
        if((typeof props.initialState === 'object') && Object.keys(props.initialState).length !== 0) {
            this.state = props.initialState
        }
    }

    render() {
        return (
            <div>
                <TitleSearch onChange={this.onChange} />
                {this.state.titles.map(title => (
                    <Title
                        title={title.label}
                        onKeywordClick={(keyword) => this.handleKeywordClick(title, keyword)}
                        selectedKeywords={this.state.keywordsByTitle[title.id] || []}
                    />
                ))}
            </div>
        )
    }

    onChange = (options) => {
        this.setState({titles: [...this.state.titles, ...options].unique()}, () => {
            this.persistState()
        })
    }

    handleKeywordClick = (title, keyword) => {
        let keywords = this.state.keywordsByTitle[title.id] || []
        const keywordIndex = keywords.indexOf(keyword)
        if (keywordIndex === -1)
            keywords.push(keyword)
        else
            keywords.splice(keywordIndex, 1);

        this.setState({keywordsByTitle: {...this.state.keywordsByTitle, [title.id]: keywords}}, () => {
            this.persistState()
        })
    }

    persistState = () => {
        // stub
    }

}

export default KCApp
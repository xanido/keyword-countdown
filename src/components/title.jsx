import React    from "react"
import omdb     from "../omdb"
import imdb     from "../imdb"
import LZString from "lz-string"
import styles from "./keyword.scss"

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imdb: {},
            keywords: [],
            expanded: false,
        }
    }


    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.title !== this.props.title) {
            this.fetchData()
        }
    }

    render() {
        var i = 1;
        if(this.state.imdb) {
            return (
                <React.Fragment>
                    <h1 onClick={this.handleTitleClick}>{this.props.title}</h1>
                    {this.state.expanded &&
                        <React.Fragment>
                            <img src={this.state.imdb.Poster}/>
                            <div className="row">
                                {this.state.keywords.map(keyword => (
                                    <React.Fragment>
                                        <div className={["col-sm-4", styles.keyword, this.props.selectedKeywords.indexOf(keyword) >= 0 ? styles.selected : ''].join(" ")}
                                             onClick={this.handleKeywordClick}>{keyword}</div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </React.Fragment>
                    }
                </React.Fragment>
            )
        } else {
            return null
        }
    }

    handleKeywordClick = (e) => {
        this.props.onKeywordClick(e.target.childNodes[0].nodeValue);
    }

    handleTitleClick = (e) => {
        this.setState({expanded: !this.state.expanded})
    }

    // shouldn't be here, should move up the chain
    fetchData() {
        omdb.get({title: this.props.title})
            .then(data => {
                this.setState({imdb: data})
                return data
            })
            .then(data => imdb.keywords(data.imdbID))
            .then(keywords => { console.log(keywords); return keywords })
            .then(keywords => {
                this.setState({keywords})
            })
    }

}

export default Title
import React  from "react"
import Title  from "./title"
import styles from "./titlewell.scss"
import {Link} from "react-router-dom"
import {withRouter} from "react-router";

class TitleWell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { keywordsByTitle, titles, onKeywordClick, onKeywordSort, match } = this.props;

    return (
      <div className={styles.titleWell}>
        {titles.map(title => (
          <Link key={title.id} to={"/edit/" + title.id}>
            <Title
              title={title.label}
              onKeywordClick={keyword => onKeywordClick(title, keyword)}
              onKeywordSort={keywords => onKeywordSort(title, keywords)}
              selectedKeywords={keywordsByTitle[title.id] || []}
              selected={match.params.id == title.id}
            />
          </Link>
        ))}
      </div>
    )
  }

}

export default withRouter(TitleWell);
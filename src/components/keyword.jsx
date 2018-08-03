import React  from "react"
import classNames from "classnames"
import styles from "./keyword.scss"

const Keyword = ({selected, children, onClick}) => {
    const keywordClass = classNames([
        "col-sm-4",
        styles.keyword,
        {[styles.selected]: selected}
    ])
    return (
        <div className={keywordClass} onClick={onClick}
            >
            {children}
        </div>
    )
}

export default Keyword
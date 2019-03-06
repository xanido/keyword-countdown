import React from "react"
import styles from "./appheader.scss"
import Share from "./share"

const AppHeader = (props) => (
  <div className={styles.appHeader}>
    Keyword Countdown
    <Share {...props}></Share>
  </div>
);

export default AppHeader;
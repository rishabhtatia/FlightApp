import React from "react";
import AUX from "../../hoc/Auxillary";
import styles from "./Layout.module.css";

const LAYOUT = (props) => {
  return (
    <AUX>
      <h1 className={styles.heading}>FLIGHT SEARCH APP</h1>
      <main>{props.children}</main>
    </AUX>
  );
};

export default LAYOUT;

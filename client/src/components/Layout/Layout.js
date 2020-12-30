import React from 'react';
import AUX from '../../hoc/Auxillary';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <AUX>
      <h1 className={styles.heading}>FLIGHT SEARCH APP</h1>
      <main>{props.children}</main>
    </AUX>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;

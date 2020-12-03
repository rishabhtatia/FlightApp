import React from 'react';
import _ from 'lodash';
import FLIGHTLIST from './Flightlist/Flighlist';
import MULTIPLEFLIGHTS from './Multipleflights/Multipleflights';
import styles from './Flightlists.module.css';

const FLIGHTLISTS = ({ data }) => {
  return (
    <div className={styles.flightLists}>
      <h1>FLIGHT LISTS</h1>
      {_.map(data, (item) =>
        Array.isArray(item) ? (
          <MULTIPLEFLIGHTS
            data={item}
            key={item[0].flightNo + item[item.length - 1].flightNo}
          />
        ) : (
          <FLIGHTLIST data={item} key={item.flightNo} />
        )
      )}
    </div>
  );
};

export default FLIGHTLISTS;

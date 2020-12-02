import React from 'react';
import FLIGHTLIST from './Flightlist/Flighlist';
import MULTIPLEFLIGHTS from './Multipleflights/Multipleflights';
import styles from './Flightlists.module.css';

const FLIGHTLISTS = (props) => {
  return (
    <div className={styles.flightLists}>
      <h1>FLIGHT LISTS</h1>
      {props.data.map((item) =>
        Array.isArray(item) ? (
          <MULTIPLEFLIGHTS data={item} key={item[0].flightNo + item[item.length - 1].flightNo}/>
        ) : (
          <FLIGHTLIST data={item} key={item.flightNo} />
        )
      )}
    </div>
  );
};

export default FLIGHTLISTS;

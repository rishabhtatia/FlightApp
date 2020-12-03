import React from 'react';
import _ from 'lodash';
import Flightlist from './Flightlist/Flighlist';
import MultipleFlights from './Multipleflights/Multipleflights';
import styles from './Flightlists.module.css';

const FlightLists = ({ data }) => {
  return (
    <div className={styles.flightLists}>
      <h1>FLIGHT LISTS</h1>
      {_.map(data, (item) =>
        Array.isArray(item) ? (
          <MultipleFlights
            data={item}
            key={item[0].flightNo + item[item.length - 1].flightNo}
          />
        ) : (
          <Flightlist data={item} key={item.flightNo} />
        )
      )}
    </div>
  );
};

export default FlightLists;

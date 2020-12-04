import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Flightlist from './Flightlist/Flighlist';
import MultipleFlights from './Multipleflights/Multipleflights';
import styles from './Flightlists.module.css';

const FlightLists = ({ data }) => {
  return (
    <div className={styles.flightLists}>
      <h1>FLIGHT LISTS</h1>
      {_.map(data, (item) =>
        Array.isArray(item) ? (
          item.length > 0 ? (
            <MultipleFlights
              flightListing={item}
              key={item[0].flightNo + item[item.length - 1].flightNo}
            />
          ) : null
        ) : (
          <Flightlist data={item} key={item.flightNo} />
        )
      )}
    </div>
  );
};

FlightLists.defaultpropTypes = {
  data: [],
};

FlightLists.propTypes = {
  data: PropTypes.any,
};

export default FlightLists;

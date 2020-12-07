import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Flightlist from './Flightlist/Flighlist';
import MultipleFlights from './Multipleflights/Multipleflights';
import styles from './Flightlists.module.css';

const FlightLists = ({ data, priceLimit }) => {
  const extractedData = data.filter((item) => {
    if (Array.isArray(item) && item) {
      const price = item.reduce((sum, prev) => prev.price + sum, 0);
      return price <= priceLimit ? true : false;
    } else {
      return item.price <= priceLimit ? true : false;
    }
  });
  return (
    <div className={styles.flightLists}>
      <h1>FLIGHT LISTS</h1>
      {_.map(extractedData, (item) =>
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
  priceLimit: 0,
};

FlightLists.propTypes = {
  data: PropTypes.any,
  priceLimit: PropTypes.number,
};

export default FlightLists;

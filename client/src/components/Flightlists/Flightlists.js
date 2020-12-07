import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Flightlist from './Flightlist/Flighlist';
import MultipleFlights from './Multipleflights/Multipleflights';
import styles from './Flightlists.module.css';
import FlightHeader from './FlightHeader/FlightHeader';

const FlightLists = ({ data, priceLimit, formData, returnFlag }) => {
  const extractedData = data.filter((item) => {
    if (Array.isArray(item) && item) {
      const price = item.reduce((sum, prev) => prev.price + sum, 0);
      return price <= priceLimit ? true : false;
    } else {
      return item.price <= priceLimit ? true : false;
    }
  });

  const addToFavouriteList = (data) => {
    const key = Math.random().toString().slice(2, 8);
    let favouriteList = JSON.parse(sessionStorage.getItem('data'));
    favouriteList = favouriteList ? favouriteList : [];
    favouriteList.forEach((item) => {
      JSON.stringify(item) === JSON.stringify(data)
        ? null
        : favouriteList.push({ id: key, value: data });
    });
    if (favouriteList.length === 0) {
      favouriteList.push({ id: key, value: data });
    }
    sessionStorage.setItem('data', JSON.stringify(favouriteList));
  };

  return (
    <div className={styles.flightLists}>
      <h1>FLIGHT LISTS</h1>
      {formData && (
        <FlightHeader
          numberOfFlights={extractedData.length}
          formData={formData}
          returnFlag={returnFlag}
        />
      )}
      {_.map(extractedData, (item) =>
        Array.isArray(item) ? (
          item.length > 0 ? (
            <MultipleFlights
              flightListing={item}
              addToFavouriteList={addToFavouriteList}
              key={item[0].flightNo + item[item.length - 1].flightNo}
            />
          ) : null
        ) : (
          <Flightlist
            data={item}
            key={item.flightNo}
            addToFavouriteList={addToFavouriteList}
          />
        )
      )}
    </div>
  );
};

FlightLists.defaultpropTypes = {
  data: [],
  priceLimit: 0,
  formData: {},
  return: false,
};

FlightLists.propTypes = {
  data: PropTypes.any,
  formData: PropTypes.any,
  priceLimit: PropTypes.number,
  returnFlag: PropTypes.bool,
};

export default FlightLists;

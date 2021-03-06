import React from 'react';
import PropTypes from 'prop-types';
import styles from './FlightHeader.module.css';

const FlightHeader = ({ numberOfFlights, formData, returnFlag }) => {
  const { originCity, destinationCity, departureDate, returnDate } = formData;
  return (
    <div className={styles.flightHeader}>
      <h4>
        {originCity} to {destinationCity}
      </h4>
      <h6>
        {numberOfFlights} flights found{' '}
        {returnFlag ? returnDate : departureDate}
      </h6>
    </div>
  );
};

FlightHeader.defaultpropTypes = {
  numberOfFlights: 0,
  returnFlag: false,
  formData: {},
};

FlightHeader.propTypes = {
  numberOfFlights: PropTypes.number,
  returnFlag: PropTypes.bool,
  formData: PropTypes.any,
};

export default FlightHeader;

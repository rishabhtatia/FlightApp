import React, { useState } from 'react';
import styles from './Sidefilter.module.css';
import _ from 'lodash';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';

const SideFilter = (props) => {
  const [formData, setFormData] = useState({
    originCity: '',
    destinationCity: '',
    departureDate: '',
    returnDate: '',
  });

  const handleInput = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const isDisabled = () => {
    return (
      !moment(formData.departureDate, 'YYYY-MM-DD').isValid() ||
      !moment(formData.returnDate, 'YYYY-MM-DD').isValid() ||
      !formData?.originCity?.length > 0 ||
      !formData?.destinationCity?.length > 0 ||
      formData.originCity === formData.destinationCity
    );
  };

  return (
    <div className={styles.sideFilter}>
      <div className={styles.buttonGroup}>
        <button
          className={clsx('btn', styles.button, {
            'btn-primary': !props.showReturnData,
          })}
          onClick={() => props.journeyType(false)}
        >
          One Way
        </button>
        <button
          className={clsx('btn', styles.button, {
            'btn-primary': props.showReturnData,
          })}
          onClick={() => props.journeyType(true)}
        >
          Return
        </button>
      </div>
      <form onSubmit={(event) => props.onSearch(event, formData)}>
        <div className="form-group">
          <select
            name="originCity"
            className={'mdb-select md-form' + styles.inputGroup}
            searchable="Search here.."
            value={formData.originCity}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Enter Origin City
            </option>
            {_.map(props.dropdownList, (item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <select
            name="destinationCity"
            className={'mdb-select md-form' + styles.inputGroup}
            searchable="Search here.."
            value={formData.destinationCity}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Enter Destination City
            </option>
            {_.map(props.dropdownList, (item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <input
            type="date"
            className={styles.inputGroup}
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInput}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="date"
            className={styles.inputGroup}
            name="returnDate"
            value={formData.returnDate}
            onChange={handleInput}
          ></input>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isDisabled()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

SideFilter.defaultpropTypes = {
  dropdownList: [],
  showReturnData: false,
};

SideFilter.propTypes = {
  dropdownList: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
  journeyType: PropTypes.func.isRequired,
  showReturnData: PropTypes.bool,
};

export default SideFilter;

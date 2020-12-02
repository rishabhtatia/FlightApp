import React, { useState } from 'react';
import styles from './Sidefilter.module.css';

const SIDEFILTER = (props) => {
  const [formData, formDataHandler] = useState({
    originCity: '',
    destinationCity: '',
    departureDate: '',
  });

  const handleInput = (event) => {
    formDataHandler((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };  
  return (
    <div className={styles.sideFilter}>
      <div className={styles.buttonGroup}>
      <button className={"btn btn-primary " + styles.button} onClick={() => props.journeyType(false, formData)}>One Way</button>
      <button className={"btn btn-primary " + styles.button} onClick={() => props.journeyType(true, formData)}>Return</button>
      </div>
      <form onSubmit={(event) => props.onSearch(event, formData)}>
        <div className="form-group">
          <select
            name="originCity"
            className="mdb-select md-form"
            searchable="Search here.."
            value={formData.originCity}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Choose your Origin City
            </option>
            {props.dropdownList.map((item) => {
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
            className="mdb-select md-form"
            searchable="Search here.."
            value={formData.destinationCity}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Choose your Destination City
            </option>
            {props.dropdownList.map((item) => {
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
            name="departureDate"            
            value={formData.departureDate}
            onChange={handleInput}
          ></input>
        </div>
        <div className="form-group">
          <input            
            type="date"
            name="returnDate"            
            value={formData.returnDate}
            onChange={handleInput}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

export default SIDEFILTER;

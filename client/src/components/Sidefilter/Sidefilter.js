import React, { useEffect, useState } from "react";
import styles from "./Sidefilter.module.css";
import _ from "lodash";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SliderRange from "../common/SliderRange/SliderRange";

const SideFilter = props => {
  const [formData, setFormData] = useState({
    originCity: "Pune (PNQ)",
    destinationCity: "Delhi (DEL)",
    departureDate: "11/01/2020",
    returnDate: null,
    passengers: ""
  });
  const [startDate, setStartDate] = useState(new Date(formData.departureDate));
  const [endDate, setEndDate] = useState(formData.returnDate);
  const [originDropdownList, setOriginDropdownList] = useState(
    props.dropdownList
  );
  const [destinationDropdownList, setDestinationDropdownList] = useState(
    props.dropdownList
  );
  const handleInput = event => {
    setFormData(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const handleDateInput = (date, name) => {
    const formattedDate = moment(date).format("MM/DD/YYYY");
    setFormData(prevState => {
      return { ...prevState, [name]: formattedDate };
    });
  };

  const isDisabled = () => {
    return (
      !moment(formData.departureDate).isValid() ||
      (props.showReturnData && !moment(formData.returnDate).isValid()) ||
      !formData?.originCity?.length > 0 ||
      !formData?.destinationCity?.length > 0 ||
      formData.originCity === formData.destinationCity ||
      !(formData.passengers > 0)
    );
  };

  const filterDropdownList = name => {
    return props.dropdownList.filter(item => item.value !== name);
  };

  useEffect(() => {
    const updatedDropdownList = filterDropdownList(formData.destinationCity);
    setOriginDropdownList(updatedDropdownList);
  }, [formData.destinationCity]);

  useEffect(() => {
    const updatedDropdownList = filterDropdownList(formData.originCity);
    setDestinationDropdownList(updatedDropdownList);
  }, [formData.originCity]);

  return (
    <div className={styles.sideFilter}>
      <div className={styles.buttonGroup}>
        <button
          className={clsx("btn", styles.button, {
            "btn-primary": !props.showReturnData
          })}
          onClick={() => props.journeyType(false)}
        >
          One Way
        </button>
        <button
          className={clsx("btn", styles.button, {
            "btn-primary": props.showReturnData
          })}
          onClick={() => props.journeyType(true)}
        >
          Return
        </button>
      </div>
      <form onSubmit={event => props.onSearch(event, formData)}>
        <div className="form-group">
          <select
            name="originCity"
            className={styles.inputGroup}
            searchable="Search here.."
            value={formData.originCity}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Enter Origin
            </option>
            {_.map(originDropdownList, item => {
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
            className={styles.inputGroup}
            searchable="Search here.."
            value={formData.destinationCity}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Enter Destination
            </option>
            {_.map(destinationDropdownList, item => {
              return (
                <option value={item.value} key={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <span>Departure Date</span>
          <DatePicker
            className={styles.inputGroup}
            selected={startDate}
            onChange={date => {
              setStartDate(date);
              handleDateInput(date, "departureDate");
            }}
            dateFormat="dd/MM/yyyy"
            minDate={"02-01-2020"}
            maxDate={"02-29-2020"}
            isClearable
          />
        </div>
        {props.showReturnData && (
          <div className="form-group">
            <span>Return Date</span>
            <DatePicker
              className={styles.inputGroup}
              selected={endDate}
              onChange={date => {
                setEndDate(date);
                handleDateInput(date, "returnDate");
              }}
              dateFormat="dd/MM/yyyy"
              placeholder="Return Date"
              isClearable
            />
          </div>
        )}
        <div className="form-group">
          <select
            name="passengers"
            className={styles.inputGroup}
            searchable="Passengers"
            value={formData.passengers}
            onChange={handleInput}
          >
            <option value="" disabled selected>
              Passengers
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button
          type="submit"
          className={clsx("btn btn-primary", styles.button)}
          disabled={isDisabled}
        >
          Search
        </button>
      </form>
      <div>
        <SliderRange
          setpriceRange={props.setpriceRange}
          label="Refine Flight Search"
          priceRange={props.priceRange}
        />
      </div>
    </div>
  );
};

SideFilter.defaultpropTypes = {
  dropdownList: [],
  showReturnData: false
};

SideFilter.propTypes = {
  dropdownList: PropTypes.array,
  priceRange: PropTypes.object,
  onSearch: PropTypes.func,
  journeyType: PropTypes.func,
  setpriceRange: PropTypes.func,
  showReturnData: PropTypes.bool
};

export default SideFilter;

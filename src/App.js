import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import API from './constant/api';
import FLIGHTLISTS from './components/Flightlists/Flightlists';
import Layout from './components/Layout/Layout';
import SIDEFILTER from './components/Sidefilter/Sidefilter';
import axios from 'axios';
import moment from 'moment';

const APP = () => {
  const [flightData, flightDataChange] = useState([]);
  const [filteredData, filteredDataChange] = useState([]);
  const [returnData, returnDataChange] = useState([]);
  const [isLoading, isLoadingChange] = useState(false);
  const [showReturnData, showReturnDataHandler] = useState(false);
  const [places, placesChange] = useState([]);
  const [originCityInput, originCityInputHandler] = useState('');
  const [destinationcityInput, destinationcityInputHandler] = useState('');

  const onSearch = (event, formData) => {
    event.preventDefault();    
    originCityInputHandler(formData.originCity);
    destinationcityInputHandler(formData.destinationCity);       
    let filteredFlightData = filterData(originCityInput, destinationcityInput, formData.departureDate, formData);
    filteredDataChange(filteredFlightData);
    if (showReturnData) {
      let returnFlightData = filterData(destinationcityInput, originCityInput, formData.returnDate, formData);
      returnDataChange(returnFlightData);
    }
  };

  const journeyType = (flag, formData) => {
    flag ? showReturnDataHandler(true) : showReturnDataHandler(false);
    if (flag) {
      let returnFlightData = filterData(destinationcityInput, originCityInput, formData.returnDate, formData);
      returnDataChange(returnFlightData);
    }
  }

  const filterData = (originCity, destinationCity, date1, formData) => {
    let date = date1 ? moment(date1).format("YYYY/MM/DD") : "";
    date = date == "Invalid date" ? "" : date;    
    const directFlightData = flightData.filter(
      (item) =>
        item.origin === originCity &&
        item.destination === destinationCity &&
        (date ? item.date == date : true)
    );
    let indirectFlighData = flightData.filter((item) => {
      if (
        item.origin === originCity &&
        item.destination === destinationCity
      ) {
        return false;
      } else {
        return date ? item.date == date : item;
      }
    });  
    let originFlighData = [];
    let destinationFlighData = [];
    originFlighData = indirectFlighData.filter((item) => item.origin === originCity);
    destinationFlighData = indirectFlighData.filter(
      (item) => item.destination === destinationCity
    );
    let newArr = [];
    let flightsArray = [];
    let flightsArray1 = [];    
    originFlighData.sort((e,f) => moment.duration(moment(e.date + ' ' + e.arrivalTime)) > moment.duration(moment(f.date + ' ' + f.arrivalTime)) ? 1 : -1);
    destinationFlighData.sort((e,f) => moment.duration(moment(e.date + ' ' + e.departureTime)) > moment.duration(moment(f.date + ' ' + f.departureTime)) ? 1 : -1);
    for (let i = 0; i < originFlighData.length; i++) {
      for (let j = 0; j < destinationFlighData.length; j++) {        
          let journeyTimestart = moment(originFlighData[i].date + ' ' + originFlighData[i].arrivalTime);
          let journeyTimeend = moment(destinationFlighData[j].date + ' ' + destinationFlighData[j].departureTime);        
          let totaljourneyTime = journeyTimeend.diff(
            journeyTimestart,
            'DD/MM/YYYY HH:mm:ss'
          );          
          totaljourneyTime = moment.duration(totaljourneyTime);
        if (originFlighData[i].destination === destinationFlighData[j].origin && originFlighData[i].date === destinationFlighData[j].date && totaljourneyTime.minutes() >= 30) {                    
          if (!flightsArray.includes(originFlighData[i].flightNo) && !flightsArray1.includes(destinationFlighData[j].flightNo)) {
          newArr.push([originFlighData[i], destinationFlighData[j]]);
          flightsArray.push(originFlighData[i].flightNo);
          flightsArray1.push(destinationFlighData[j].flightNo);
        }                  
        }
      }
    }
    let filteredFlightData = directFlightData.concat(newArr);      
    return filteredFlightData;
  }

  useEffect(() => {
    (async () => {
      const response = await axios.get(API.flighapi);
      const data = response.data;
      let placesArr = [
        { label: 'Mumbai (BOM)', value: 'Mumbai (BOM)' },
        { label: 'Delhi (DEL)', value: 'Delhi (DEL)' },
        { label: 'Bengaluru (BLR)', value: 'Bengaluru (BLR)' },
        { label: 'Pune (PNQ)', value: 'Pune (PNQ)' },
      ];      
      placesChange(placesArr);
      flightDataChange(data);      
      isLoadingChange(true);
    })();
  }, []);
  return (
    <div className={styles.app}>
      <Layout>
        {isLoading ? (
          <div className="row">
            <div className={"col-md-2" + styles.noPadding}>
              <SIDEFILTER
                dropdownList={places}
                onSearch={onSearch}
                journeyType={journeyType}
              ></SIDEFILTER>
            </div>
            <div className={showReturnData ? "col-md-5 " : "col-md-10 " + styles.noPadding}>
              <FLIGHTLISTS data={filteredData}></FLIGHTLISTS>
            </div>
            {showReturnData && <div className={"col-md-5 " + styles.noPadding}>
              <FLIGHTLISTS data={returnData}></FLIGHTLISTS>
            </div>}
          </div>
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default APP;

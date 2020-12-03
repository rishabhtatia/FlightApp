import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import API from './constant/api';
import FLIGHTLISTS from './components/Flightlists/Flightlists';
import Layout from './components/Layout/Layout';
import SIDEFILTER from './components/Sidefilter/Sidefilter';
import axios from 'axios';
import moment from 'moment';

const APP = () => {
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [showReturnData, setshowReturnData] = useState(false);
  const [places, setPlaces] = useState([]);
  const [originCityInput, setOriginCity] = useState('');
  const [destinationcityInput, setDestinationCity] = useState('');
  const onSearch = (event, formData) => {
    event.preventDefault();
    setOriginCity(formData.originCity);
    setDestinationCity(formData.destinationCity);
    let filteredFlightData = filterData(
      formData.originCity,
      formData.destinationCity,
      formData.departureDate,
      formData
    );
    setFilteredData(filteredFlightData);
    if (showReturnData) {
      let returnFlightData = filterData(
        formData.destinationCity,
        formData.originCity,
        formData.returnDate,
        formData
      );
      setReturnData(returnFlightData);
    }
  };

  const journeyType = (flag, formData) => {
    flag ? setshowReturnData(true) : setshowReturnData(false);
    if (flag) {
      let returnFlightData = filterData(
        formData.destinationCity,
        formData.originCity,
        formData.returnDate,
        formData
      );
      setReturnData(returnFlightData);
    }
  };

  const filterData = (originCity, destinationCity, date1, formData) => {
    let date = moment(date1).isValid()
      ? moment(date1).format('YYYY/MM/DD')
      : '';
    const directFlightData = flightData.filter(
      (item) =>
        item.origin === originCity &&
        item.destination === destinationCity &&
        (date ? item.date == date : true)
    );
    let indirectFlighData = flightData.filter((item) => {
      if (item.origin === originCity && item.destination === destinationCity) {
        return false;
      } else {
        return date ? item.date == date : item;
      }
    });
    let originFlighData = [];
    let destinationFlighData = [];
    originFlighData = indirectFlighData.filter(
      (item) => item.origin === originCity
    );
    destinationFlighData = indirectFlighData.filter(
      (item) => item.destination === destinationCity
    );
    let newArr = [];
    let originflightsArray = [];
    let destinationflightsArray = [];
    originFlighData.sort((e, f) =>
      moment.duration(moment(`${e.date} ${e.arrivalTime}`)) >
      moment.duration(moment(`${f.date} ${f.arrivalTime}`))
        ? 1
        : -1
    );
    destinationFlighData.sort((e, f) =>
      moment.duration(moment(`${e.date} ${e.departureTime}`)) >
      moment.duration(moment(`${f.date} ${f.departureTime}`))
        ? 1
        : -1
    );
    for (let i = 0; i < originFlighData.length; i++) {
      for (let j = 0; j < destinationFlighData.length; j++) {
        let journeyTimestart = moment(
          `${originFlighData[i].date} ${originFlighData[i].arrivalTime}`
        );
        let journeyTimeend = moment(
          `${destinationFlighData[j].date} ${destinationFlighData[j].departureTime}`
        );
        let totaljourneyTime = journeyTimeend.diff(
          journeyTimestart,
          'DD/MM/YYYY HH:mm:ss'
        );
        totaljourneyTime = moment.duration(totaljourneyTime);
        if (
          originFlighData[i].destination === destinationFlighData[j].origin &&
          originFlighData[i].date === destinationFlighData[j].date &&
          totaljourneyTime.minutes() >= 30
        ) {
          if (
            !originflightsArray.includes(originFlighData[i].flightNo) &&
            !destinationflightsArray.includes(destinationFlighData[j].flightNo)
          ) {
            newArr.push([originFlighData[i], destinationFlighData[j]]);
            originflightsArray.push(originFlighData[i].flightNo);
            destinationflightsArray.push(destinationFlighData[j].flightNo);
          }
        }
      }
    }
    let filteredFlightData = [...directFlightData, ...newArr];
    return filteredFlightData;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(API.flighapi);
        const data = response.data;
        let placesArr = [
          { label: 'Mumbai (BOM)', value: 'Mumbai (BOM)' },
          { label: 'Delhi (DEL)', value: 'Delhi (DEL)' },
          { label: 'Bengaluru (BLR)', value: 'Bengaluru (BLR)' },
          { label: 'Pune (PNQ)', value: 'Pune (PNQ)' },
        ];
        setPlaces(placesArr);
        setFlightData(data);
        setIsloading(true);
      } catch (err) {
        console.log('Eror:' + err);
        setIsloading(true);
        setIserror(true);
      }
    })();
  }, []);
  return isError ? (
    <h1>Error occured</h1>
  ) : (
    <div className={styles.app}>
      <Layout>
        {isLoading ? (
          <div className="row" style={{ margin: 0 }}>
            <div className={'col-md-2' + styles.noPadding}>
              <SIDEFILTER
                dropdownList={places}
                onSearch={onSearch}
                journeyType={journeyType}
                showReturnData={showReturnData}
              ></SIDEFILTER>
            </div>
            <div
              className={
                showReturnData ? 'col-md-5 ' : 'col-md-10 ' + styles.noPadding
              }
            >
              <FLIGHTLISTS data={filteredData}></FLIGHTLISTS>
            </div>
            {showReturnData && (
              <div className={'col-md-5 ' + styles.noPadding}>
                <FLIGHTLISTS data={returnData}></FLIGHTLISTS>
              </div>
            )}
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

import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import API from './constant/api';
import FlightLists from './components/Flightlists/Flightlists';
import Layout from './components/Layout/Layout';
import Sidefilter from './components/Sidefilter/Sidefilter';
import axios from 'axios';

const App = () => {
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
    onSearchCall(formData);
  };

  const onSearchCall = async (formData) => {
    try {
      const response = await axios.post(`${API.serverapi}/search`, {
        returnDataFlag: showReturnData,
        formData,
      });
      setFilteredData(response.data.flightOneWayData);
      if (showReturnData) {
        setReturnData(response.data.returnFlighData);
      }
    } catch (err) {
      console.liog('Error Occured');
    }
  };

  const journeyType = (flag) => {
    if (flag) {
      setshowReturnData(true);
      setReturnData([]);
    } else {
      setshowReturnData(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API.serverapi}/dropdown`);
        const data = response.data;
        setPlaces(data);
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
              <Sidefilter
                dropdownList={places}
                onSearch={onSearch}
                journeyType={journeyType}
                showReturnData={showReturnData}
              ></Sidefilter>
            </div>
            <div
              className={
                showReturnData ? 'col-md-5 ' : 'col-md-10 ' + styles.noPadding
              }
            >
              <FlightLists data={filteredData}></FlightLists>
            </div>
            {showReturnData && (
              <div className={'col-md-5 ' + styles.noPadding}>
                <FlightLists data={returnData}></FlightLists>
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

export default App;

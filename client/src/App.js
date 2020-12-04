import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import API from './constant/api';
import clsx from 'clsx';
import FlightLists from './components/Flightlists/Flightlists';
import Layout from './components/Layout/Layout';
import Sidefilter from './components/Sidefilter/Sidefilter';
import axios from 'axios';

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIserror] = useState(false);
  const [isErrorMessage, setIserrorMessage] = useState('');
  const [showReturnData, setshowReturnData] = useState(false);
  const [places, setPlaces] = useState([]);

  const onSearch = (event, formData) => {
    event.preventDefault();
    onSearchCall(formData);
  };

  const onSearchCall = async (formData) => {
    try {
      const response = await axios.post(`${API.serverapi}/search`, {
        returnDataFlag: showReturnData,
        formData,
      });
      if (response?.data?.flightOneWayData) {
        setFilteredData(response?.data?.flightOneWayData);
      }
      if (showReturnData) {
        setReturnData(response?.data?.returnFlightData);
      }
    } catch (err) {
      setIserror(true);
      setIserrorMessage(err.message);
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
        setIsloading(true);
        setIserror(true);
        setIserrorMessage(err.message);
      }
    })();
  }, []);
  return isError ? (
    <h1>Error:{isErrorMessage}</h1>
  ) : (
    <div className={styles.app}>
      <Layout>
        {isLoading ? (
          <div className="row" style={{ margin: 0 }}>
            <div className={clsx('col-md-2', styles.noPadding)}>
              <Sidefilter
                dropdownList={places}
                onSearch={onSearch}
                journeyType={journeyType}
                showReturnData={showReturnData}
              ></Sidefilter>
            </div>
            <div
              className={clsx(
                showReturnData ? 'col-md-5' : 'col-md-10',
                styles.noPadding
              )}
            >
              <FlightLists data={filteredData}></FlightLists>
            </div>
            {showReturnData && (
              <div className={clsx('col-md-5 ', styles.noPadding)}>
                <FlightLists data={returnData}></FlightLists>
              </div>
            )}
          </div>
        ) : (
          <div className="spinner-border text-primary">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default App;

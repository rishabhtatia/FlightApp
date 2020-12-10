import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import clsx from 'clsx';
import FlightLists from './components/Flightlists/Flightlists';
import Layout from './components/Layout/Layout';
import Sidefilter from './components/Sidefilter/Sidefilter';
import axios from 'axios';
import { Link } from 'react-router-dom';

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [returnData, setReturnData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIserror] = useState(false);
  const [isErrorMessage, setIserrorMessage] = useState('');
  const [showReturnData, setshowReturnData] = useState(false);
  const [formData, setformData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [priceLimit, setpriceLimit] = useState(0);
  const onSearch = (event, formData) => {
    event.preventDefault();
    setformData(formData);
    onSearchCall(formData);
  };

  const onChangeSlider = (price) => {
    setpriceLimit(parseInt(price));
  };

  const onSearchCall = async (formData) => {
    try {
      const response = await axios.post("api/search", {
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
        const response = await axios.get(`api/dropdown`);
        const data = response.data;
        setPlaces(data);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
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
          <div className="spinner-border text-primary">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="row" style={{ margin: 0 }}>
            <div className={clsx('col-md-2', styles.noPadding)}>
              <Sidefilter
                dropdownList={places}
                onSearch={onSearch}
                journeyType={journeyType}
                showReturnData={showReturnData}
                onChangeSlider={onChangeSlider}
              ></Sidefilter>
              <Link to="/favouritelist">FavouriteList</Link>
            </div>
            <div
              className={clsx(
                showReturnData ? 'col-md-5' : 'col-md-10',
                styles.noPadding
              )}
            >
              <FlightLists
                data={filteredData}
                priceLimit={priceLimit}
                formData={formData}
              ></FlightLists>
            </div>
            {showReturnData && (
              <div className={clsx('col-md-5 ', styles.noPadding)}>
                <FlightLists
                  data={returnData}
                  priceLimit={priceLimit}
                  formData={formData}
                  returnFlag={true}
                ></FlightLists>
              </div>
            )}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default App;

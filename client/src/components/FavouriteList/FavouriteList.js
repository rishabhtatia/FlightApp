import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Flightlist from '../Flightlists/Flightlist/Flighlist';
import MultipleFlights from '../Flightlists/Multipleflights/Multipleflights';
import { Link } from 'react-router-dom';

const FavouriteList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let sessionData = JSON.parse(sessionStorage.getItem('data'));
    sessionData = sessionData ? sessionData : [];
    setData(sessionData);
  }, []);

  const addRemoveItem = (item, addFlag, uniqueId) => {
    if (addFlag) {
      const key = Math.random().toString().slice(2, 8);
      setData((prevState) => [...prevState, { id: key, value: item }]);
      sessionStorage.setItem('data', JSON.stringify(data));
    } else {
      let removedData = [...data];
      removedData = removedData.filter((item) => item.id !== uniqueId);
      setData(removedData);
    }
  };

  return (
    <div>
      <h1>Favourite List</h1>
      <Link to="/">Home</Link>
      {_.map(data, (item) =>
        Array.isArray(item?.value) ? (
          item?.value?.length > 0 ? (
            <MultipleFlights
              flightListing={item?.value}
              addRemove={true}
              addRemoveItem={addRemoveItem}
              key={item.id}
              id={item.id}
            />
          ) : null
        ) : (
          <Flightlist
            data={item?.value}
            key={item.id}
            id={item.id}
            addRemove={true}
            addRemoveItem={addRemoveItem}
          />
        )
      )}
    </div>
  );
};

export default FavouriteList;

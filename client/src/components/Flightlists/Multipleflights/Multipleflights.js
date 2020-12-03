import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './Multipleflights.module.css';
import Flightlist from '../Flightlist/Flighlist';

const MultipleFlights = ({ data }) => {
  const [expandFlag, expandFlagHandler] = useState(false);
  const calculateTimeDifference = (date1, time1, date2, time2) => {
    let journeyTimestart = moment(`${date1} ${time1}`);
    let journeyTimeend = moment(`${date2} ${time2}`);
    let totaljourneyTime = journeyTimeend.diff(
      journeyTimestart,
      'DD/MM/YYYY HH:mm:ss'
    );
    totaljourneyTime = moment.duration(totaljourneyTime);
    return totaljourneyTime;
  };
  let totaljourneyTime = calculateTimeDifference(
    data[0].date,
    data[0].departureTime,
    data[data.length - 1].date,
    data[data.length - 1].arrivalTime
  );
  let layoverTime = calculateTimeDifference(
    data[0].date,
    data[0].arrivalTime,
    data[data.length - 1].date,
    data[data.length - 1].departureTime
  );
  let price = data.reduce((sum, prev) => prev.price + sum, 0);

  return (
    <div className={styles.multipleFlights}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              <h4>Multiple</h4>
              <button
                className={styles.expandFlagButton}
                onClick={() => expandFlagHandler(!expandFlag)}
              >
                {expandFlag ? 'HideDetails' : 'ShowDetails'}
              </button>
            </div>
            <div className="col-sm">
              <h4>{data[0].departureTime}</h4>
              <span>{data[0].origin}</span>
            </div>
            <div className="col-sm">
              <h4>{data[data.length - 1].arrivalTime}</h4>
              <span>{data[data.length - 1].destination}</span>
            </div>
            <div className="col-sm">
              <h4 className={styles.totalDuration}>
                {`${totaljourneyTime._data.hours}h:${totaljourneyTime._data.minutes}m`}
              </h4>
              <span>Total Duration</span>
            </div>
            <div className="col-sm">
              <h4 className={styles.redColor}>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(price)}
              </h4>
            </div>
          </div>
        </div>
        {expandFlag &&
          _.map(data, (item, index) => {
            return (
              <div>
                <Flightlist
                  data={item}
                  key={item.flightNo + index}
                  multiple={true}
                />
                {!(index % 2) && (
                  <div className={styles.separator}>
                    Layover Time:{' '}
                    {`${layoverTime._data.hours}h:${layoverTime._data.minutes}m`}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

MultipleFlights.protoTypes = {
  data: PropTypes.any,
};

export default MultipleFlights;

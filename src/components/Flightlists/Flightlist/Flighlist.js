import React from 'react';
import moment from 'moment';
import styles from './Flightlist.module.css';

const FLIGHTLIST = (props) => {
  const data = props.data;
  const journeyTimestart = moment(data.date + ' ' + data.departureTime);
  const journeyTimeend = moment(data.date + ' ' + data.arrivalTime);  
  let totaljourneyTime = journeyTimeend.diff(
    journeyTimestart,
    'DD/MM/YYYY HH:mm:ss'
  );  
  totaljourneyTime = moment.duration(totaljourneyTime);    
  return (
    <div className={styles.flightList + " " + (!props.multiple ? styles.border: '')}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              <h4>{data.name}</h4>
              <span>{data.flightNo}</span>
            </div>
            <div className="col-sm">
              <h4>{data.departureTime}</h4>
              <span>{data.origin}</span>
            </div>
            <div className="col-sm">
              <h4>{data.arrivalTime}</h4>
              <span>{data.destination}</span>
            </div>
            <div className="col-sm">
              <h4>{totaljourneyTime._data.hours + 'h:' + totaljourneyTime._data.minutes + 'm'}</h4>
              <span>Non Stop</span>
            </div>
            <div className="col-sm">
              {!props.multiple && (
                <h4 className={styles.price}>
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(data.price)}
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FLIGHTLIST;

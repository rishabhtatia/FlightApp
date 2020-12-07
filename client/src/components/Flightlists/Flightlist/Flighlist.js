import React from 'react';
import PropTypes from 'prop-types';
import styles from './Flightlist.module.css';
import clsx from 'clsx';

const Flightlist = ({
  data,
  multiple,
  addToFavouriteList,
  addRemoveItem,
  id,
}) => {
  return (
    <div className={clsx(styles.flightList, styles.Blackborder && !multiple)}>
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
              <h4>{data.journeyTime}</h4>
              <span>Non Stop</span>
            </div>
            <div className="col-sm">
              {!multiple && (
                <h4 className={styles.redColor}>
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(data.price)}
                </h4>
              )}
            </div>
            <div className="col-sm">
              {!multiple && addToFavouriteList && (
                <button
                  className="btn btn-success"
                  onClick={() => addToFavouriteList(data)}
                >
                  Favourite
                </button>
              )}
            </div>
            {addRemoveItem && (
              <div className="col-sm">
                <button
                  className="btn btn-primary"
                  onClick={() => addRemoveItem(data, true)}
                >
                  ADD
                </button>
              </div>
            )}
            {addRemoveItem && (
              <div className="col-sm">
                <button
                  className="btn btn-danger"
                  onClick={() => addRemoveItem(data, false, id)}
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Flightlist.defaultpropTypes = {
  data: {},
  id: '',
};

Flightlist.propTypes = {
  data: PropTypes.any,
  multiple: PropTypes.bool,
  addRemoveItem: PropTypes.func,
  id: PropTypes.string,
  addToFavouriteList: PropTypes.func,
};

export default Flightlist;

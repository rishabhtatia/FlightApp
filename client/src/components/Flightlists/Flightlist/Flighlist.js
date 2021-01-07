import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Flightlist.module.css";
import clsx from "clsx";

const Flightlist = ({
  data,
  multiple,
  addToFavouriteList,
  addRemoveItem,
  id
}) => {
  const [isDisabled, setDisabled] = useState(false);
  return (
    <div
      className={clsx(styles.flightList, multiple ? null : styles.blackBorder)}
    >
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
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR"
                  }).format(data.price)}
                </h4>
              )}
            </div>
            <div className="col-sm">
              {!multiple && addToFavouriteList && (
                <button
                  className={clsx("btn btn-success", styles.cursorPointer)}
                  onClick={() => {
                    setDisabled(true);
                    addToFavouriteList(data);
                  }}
                  disabled={isDisabled}
                >
                  Favourite
                </button>
              )}
            </div>
            {addRemoveItem && (
              <div className="col-sm">
                <button
                  className={clsx("btn btn-primary", styles.cursorPointer)}
                  onClick={() => addRemoveItem(data, true)}
                >
                  ADD
                </button>
              </div>
            )}
            {addRemoveItem && (
              <div className="col-sm">
                <button
                  className={clsx("btn btn-danger", styles.cursorPointer)}
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
  id: ""
};

Flightlist.propTypes = {
  data: PropTypes.any,
  multiple: PropTypes.bool,
  addRemoveItem: PropTypes.func,
  id: PropTypes.string,
  addToFavouriteList: PropTypes.func
};

export default Flightlist;

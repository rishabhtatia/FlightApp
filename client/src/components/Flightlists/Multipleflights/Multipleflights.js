import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import clsx from "clsx";
import styles from "./Multipleflights.module.css";
import Flightlist from "../Flightlist/Flighlist";

const MultipleFlights = ({
  flightListing,
  addToFavouriteList,
  addRemoveItem,
  id
}) => {
  const [expandFlag, setExpandFlag] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const price = flightListing.reduce((sum, prev) => prev.price + sum, 0);

  return (
    <div className={styles.multipleFlights}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              <h4>Multiple</h4>
              <button
                className={clsx(styles.expandFlagButton, styles.cursorPointer)}
                onClick={() => setExpandFlag(!expandFlag)}
              >
                {expandFlag ? "HideDetails" : "ShowDetails"}
              </button>
            </div>
            <div className="col-sm">
              <h4>{flightListing[0].departureTime}</h4>
              <span>{flightListing[0].origin}</span>
            </div>
            <div className="col-sm">
              <h4>{flightListing[flightListing.length - 1].arrivalTime}</h4>
              <span>{flightListing[flightListing.length - 1].destination}</span>
            </div>
            <div className="col-sm">
              <h4 className={styles.totalDuration}>
                {flightListing[0].totaDurationofJourney}
              </h4>
              <span>Total Duration</span>
            </div>
            <div className="col-sm">
              <h4 className={styles.redColor}>
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR"
                }).format(price)}
              </h4>
            </div>
            <div className="col-sm">
              {addToFavouriteList && (
                <button
                  className={clsx("btn btn-success", styles.cursorPointer)}
                  onClick={() => {
                    setDisabled(true);
                    addToFavouriteList(flightListing);
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
                  onClick={() => addRemoveItem(flightListing, true)}
                >
                  ADD
                </button>
              </div>
            )}
            {addRemoveItem && (
              <div className="col-sm">
                <button
                  className={clsx("btn btn-danger", styles.cursorPointer)}
                  onClick={() => addRemoveItem(flightListing, false, id)}
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>
        </div>
        {expandFlag &&
          _.map(flightListing, (item, index) => {
            return (
              <div>
                <Flightlist
                  data={item}
                  key={item.flightNo + index}
                  multiple={true}
                />
                {!(index % 2) && (
                  <div className={styles.separator}>
                    Layover Time: {flightListing[0].layoverTime}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

MultipleFlights.defaultpropTypes = {
  flightListing: [],
  id: ""
};

MultipleFlights.propTypes = {
  flightListing: PropTypes.any,
  addToFavouriteList: PropTypes.func,
  addRemoveItem: PropTypes.func,
  id: PropTypes.string
};

export default MultipleFlights;

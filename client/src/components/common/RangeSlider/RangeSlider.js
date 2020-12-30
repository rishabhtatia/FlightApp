import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './RangeSlider.module.css';

const RangeSlider = ({ max, min, label, onChangeSlider, passengers }) => {
  const [slider, setSlider] = useState({
    max: max,
    min: min,
    value: 0,
    label: label,
  });

  const onSlide = (event) => {
    onChangeSlider(event.target.value, passengers);
    setSlider((prevState) => ({ ...prevState, value: event.target.value }));
  };

  return (
    <div className={styles.rangeSlider}>
      <p>{slider.label}</p>
      <p>{slider.value}</p>
      <div>
        <span>{slider.min}</span>
        <input
          type="range"
          min={slider.min}
          max={slider.max}
          value={slider.value}
          step="1000"
          onChange={onSlide}
          className="slider"
        ></input>
        <span>{slider.max}</span>
      </div>
    </div>
  );
};

RangeSlider.defaultpropTypes = {
  max: 0,
  min: 0,
  label: '',
};

RangeSlider.propTypes = {
  onChangeSlider: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  label: PropTypes.string,
  passengers: PropTypes.number,
};

export default RangeSlider;

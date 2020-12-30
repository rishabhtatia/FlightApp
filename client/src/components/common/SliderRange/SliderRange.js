import React, { useState } from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import styles from "./SliderRange.module.css";

const SliderRange = ({ label, priceRange, setpriceRange }) => {
  const [slide] = useState({    
    value: 0,
    label: label
  });  
  return (
    <div className={styles.sliderRange}>
      <p>{slide.label}</p>
      <InputRange
        className="inputRangeField"
        formatLabel={(value) => `${value} Rs`}
        step={1000}
        maxValue={20000}
        minValue={0}
        onChange={(value) => setpriceRange(value)}
        onChangeComplete={(value) => setpriceRange(value)}
        value={priceRange}
      />
    </div>
  );
};

SliderRange.defaultpropTypes = {
  priceRange:{min:0, max:20000},
  label: ""
};

SliderRange.propTypes = {
  setpriceRange: PropTypes.func,
  priceRange:PropTypes.object,
  label: PropTypes.string,
  passengers: PropTypes.number
};

export default SliderRange;

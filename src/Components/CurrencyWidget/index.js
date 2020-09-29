import React from "react";
import { CurrencyTypes } from "../../constants";
import PropsTypes from "prop-types";
import "./index.css";

export const CurrencyWidget = (props) => {
  return (
    <div className='widget-wrapper'>
      <h3>{props.title}</h3>
      <input
      className='widget-input'
        type={'number'}
        onChange={props.onInputChange}
        placeholder={props.inputPlaceholder}
        value={props.inputValue}
        disabled={props.inputDisabled}
      />
      <select onChange={props.onCurrencyTypeChange}>
        {CurrencyTypes.map((type, index) => (
          <option value={type} key={index}>{type}</option>
        ))}
      </select>
    </div>
  );
};

CurrencyWidget.propTypes = {
  title: PropsTypes.string.isRequired,
  onInputChange: PropsTypes.func.isRequired,
  inputPlaceholder: PropsTypes.string.isRequired,
  inputValue: PropsTypes.number.isRequired,
  onCurrencyTypeChange: PropsTypes.func.isRequired,
  inputDisabled:PropsTypes.bool.isRequired
};

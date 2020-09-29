import React, { useState } from "react";
import { CurrencyWidget } from "./Components/CurrencyWidget";
import "./App.css";

function App() {
  const [inputAmount, setInputAmount] = useState(0);//if default value is present Placeholder will not enabled
  const [outputAmount, setOutputAmount] = useState(0);

  const [inputTypeCurrency, setInputTypeCurrency] = useState("");//I am trying to store Input amout entered by USER
  const [outputTypeCurrency, setOutputTypeCurrency] = useState("");//OutPut amount by API

  const [loadingMessage, setLoadingMessage] = useState("");//during the Convert button the message is being displayed(API is being called)

  const isValidateInputs = () => {
    if (inputAmount <= 0) {
      alert("Enter a valid input amount");
    } else if (inputTypeCurrency === "" || inputTypeCurrency === "SELECT") {
      alert("Select a valid input currency type");
    } else if (outputTypeCurrency === "" || outputTypeCurrency === "SELECT") {
      alert("Select a valid output currency type");
    } else if(inputTypeCurrency === outputTypeCurrency) {
      alert('Both Input Type & Output Currency local are equal..!');
    }else {
      return true;
    }
    return false;
  };

  const onConvertClick = () => {
    if (isValidateInputs()) {
      const queryParams = `amount=${inputAmount}&from=${inputTypeCurrency}&to=${outputTypeCurrency}`;//Template sting rather then using concat
      setLoadingMessage("Please Wait...");
      fetch("https://api.frankfurter.app/latest?" + queryParams)//Get API, fetch is stored in windows object. It call in Async mode
        .then((res) => res.json())//fetched value will be in STRING format so converting to JSON, JSON also returning the promises 
        .then((res) => setOutputAmount(res.rates[outputTypeCurrency]))
        .catch((err) => console.log(err))
        .finally(() => setLoadingMessage(""));
    }
  };

  return (
    <div className="container">
      <CurrencyWidget
        title={"Input Amount"}
        onInputChange={(evt) => {
          setInputAmount(evt.target.value);
        }}
        inputDisabled={false}
        inputPlaceholder={"Enter the amount: Ex-30"}
        inputValue={inputAmount}
        onCurrencyTypeChange={(evt) => {
          setInputTypeCurrency(evt.target.value);
        }}
      />
      <div>
        <button onClick={onConvertClick}>Convert</button>
        <br />
        <span>{loadingMessage}</span> 
      </div>

      <CurrencyWidget
        title={"Output Amount"}
        onInputChange={() => {}}
        inputDisabled={true}
        inputPlaceholder={"Converted Amount"}
        inputValue={outputAmount}
        onCurrencyTypeChange={(evt) => {
          setOutputTypeCurrency(evt.target.value);
        }}
      />
    </div>
  );
}

export default App;

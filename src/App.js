import React, { useState } from "react";
import { CurrencyWidget } from "./Components/CurrencyWidget";
import "./App.css";

function App() {
  const [inputAmount, setInputAmount] = useState(null);
  const [outputAmount, setOutputAmount] = useState(null);

  const [inputTypeCurrency, setInputTypeCurrency] = useState("");
  const [outputTypeCurrency, setOutputTypeCurrency] = useState("");

  const [loadingMessage, setLoadingMessage] = useState("");

  const isValidateInputs = () => {
    if (inputAmount <= 0) {
      alert("Enter a valid input amount");
    } else if (inputTypeCurrency === "" || inputTypeCurrency === "SELECT") {
      alert("Select a valid input currency type");
    } else if (outputTypeCurrency === "" || outputTypeCurrency === "SELECT") {
      alert("Select a valid output currency type");
    } else {
      return true;
    }
    return false;
  };

  const onConvertClick = () => {
    if (isValidateInputs()) {
      const queryParams = `amount=${inputAmount}&from=${inputTypeCurrency}&to=${outputTypeCurrency}`;
      setLoadingMessage("Please Wait...");
      fetch("https://api.frankfurter.app/latest?" + queryParams)
        .then((res) => res.json())
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

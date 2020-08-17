import React, { useState, useEffect } from "react";

function CurrencyInput(props) {
  const [currencyValue, setCurrencyValue] = useState();
  const [bitCoinValue, setBitCoinValue] = useState(1);
  const { data, currency } = { ...props };
  console.log(data, currency);
  function changeBitcoinValue(value) {
    setBitCoinValue(value);
    setCurrencyValue(parseFloat(value * data.bpi[currency].rate_float));
  }

  function changeCurrencyValue(value) {
    setCurrencyValue(value);
    setBitCoinValue(parseFloat(value / data.bpi[currency].rate_float));
  }

  return (
    <div>
      {data && data.bpi[currency] && (
        <div>
          <div>{data.time.updated} </div>
          <div>{data.bpi[currency].rate_float} </div>
          <div>{data.bpi[currency].description} </div>
          <div>{data.disclaimer} </div>
        </div>
      )}
      <input
        value={bitCoinValue}
        onChange={(event) => changeBitcoinValue(event.target.value)}
      />
      <input
        value={currencyValue}
        onChange={(event) => changeCurrencyValue(event.target.value)}
      />
    </div>
  );
}

export default CurrencyInput;

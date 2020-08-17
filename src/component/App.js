import React, { useEffect, useState } from "react";
import "../style/App.scss";
import CurrencyAreaChart from "./CurrencyAreaChart";

function App() {
  const [data, setData] = useState();
  const [currencyValue, setCurrencyValue] = useState();
  const [bitCoinValue, setBitCoinValue] = useState(1);
  const [currency, setCurrency] = useState("INR");
  useEffect(() => {
    fetch(`/v1/bpi/currentprice/${currency}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCurrencyValue(bitCoinValue * data.bpi[currency].rate_float);
      })
      .catch((error) => console.log(error));
  }, [currency]);

  function selectCurrency(event) {
    setCurrency(event.target.value);
  }
  function changeBitcoinValue(value) {
    setBitCoinValue(value);
    if (data)
      setCurrencyValue(parseFloat(value * data.bpi[currency].rate_float));
  }

  function changeCurrencyValue(value) {
    setCurrencyValue(value);
    if (data)
      setBitCoinValue(parseFloat(value / data.bpi[currency].rate_float));
  }

  return (
    <div className="App">
      <div className="card">
        <div>
          <div className="title">1 Bitcoin equals</div>
          {data && data.bpi[currency] && (
            <div>
              <div className="rate">
                {data.bpi[currency].rate_float.toLocaleString()}{" "}
                {data.bpi[currency].description}
              </div>
              <div className="row updatedTime setwidth">
                <div>{data.time.updated}</div>
                <div
                  className="disclaimer tooltip"
                  data-tooltip={data.disclaimer}
                >
                  Disclaimer
                </div>
              </div>
            </div>
          )}
          <div className="setwidth">
            <div className="row ">
              <input
                value={bitCoinValue}
                onChange={(event) => changeBitcoinValue(event.target.value)}
              />
              <div>Bitcoin</div>
            </div>
            <div className="row">
              <input
                value={currencyValue}
                onChange={(event) => changeCurrencyValue(event.target.value)}
              />
              <select
                onChange={(value) => selectCurrency(value)}
                defaultValue="INR"
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="CNY">CNY</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
        <CurrencyAreaChart currency={currency} />
      </div>
    </div>
  );
}

export default App;

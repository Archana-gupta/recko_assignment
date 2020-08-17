import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import moment from "moment";

function CurrencyAreaChart(props) {
  const [historyData, setHistoryData] = useState();
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [activeDate, setActiveDate] = useState();

  useEffect(() => {
    let url =
      "/v1/bpi/historical/close?" +
      new URLSearchParams({
        currency: props.currency,
      });
    if (start && end) {
      url =
        "/v1/bpi/historical/close?" +
        new URLSearchParams({
          currency: props.currency,
          start: start,
          end: end,
        });
    }
    fetch(url, {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          let sortedData = [["Bitcoin Currency", ""]];
          Object.keys(result.bpi).forEach(function (key) {
            sortedData.push([key, result.bpi[key]]);
          });
          setHistoryData(sortedData);
          setEndDate(moment().format("YYYY-MM-DD"));
        }
      })
      .catch((error) => console.log(error));
  }, [props.currency, start, end]);

  function setDate(event) {
    setActiveDate(event.target.name);
    switch (event.target.name) {
      case "1D":
        setStartDate(
          moment().subtract(1, "days").startOf("day").format("YYYY-MM-DD")
        );
        setEndDate(moment().endOf("day").format("YYYY-MM-DD"));
        break;
      case "5D":
        setStartDate(moment().subtract(5, "days").format("YYYY-MM-DD"));
        break;
      case "6M":
        setStartDate(moment().subtract(1, "months").format("YYYY-MM-DD"));
        break;
      case "1Y":
        setStartDate(moment().subtract(1, "year").format("YYYY-MM-DD"));
        break;
      default:
        break;
    }
  }
  return (
    <div className="chart">
      <div className="row">
        <button
          name="1D"
          onClick={(event) => setDate(event)}
          className={`dayPicker ${activeDate === "1D" ? "active" : ""}`}
        >
          D
        </button>
        <button
          name="5D"
          onClick={(event) => setDate(event)}
          className={`dayPicker ${activeDate === "5D" ? "active" : ""}`}
        >
          5D
        </button>
        <button
          name="6M"
          onClick={(event) => setDate(event)}
          className={`dayPicker ${activeDate === "6M" ? "active" : ""}`}
        >
          6M
        </button>
        <button
          name="1Y"
          onClick={(event) => setDate(event)}
          className={`dayPicker ${activeDate === "1Y" ? "active" : ""}`}
        >
          1Y
        </button>
      </div>
      <Chart
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={historyData}
        options={{
          hAxis: {
            title: "Year",
            titleTextStyle: { color: "#333" },
          },
          colors: ["green", "rgb(15, 157, 88)", "rgba(15, 157, 88 , 0.3)"],
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default CurrencyAreaChart;

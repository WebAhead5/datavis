import React from "react";
import htmlConverter from "./h2C/HtmlConverter";
import ChartDisplay from "./ChartDisplay";

export default function ShowChart({ setCurrentPage, chart, dataObject, optionsObject, bgColor }) {
  return (
    <div className="showChart">

      <input type="button"
        className="btn btn-outline-primary"
        // onClick={}
        value="Save Chart to History"
      />

      <input type="button"
        className="btn btn-outline-info"
        onClick={htmlConverter}
        value="Download Chart"
      />

      <input type="button"
        className="btn btn-warning ml-3"
        value="Edit"
        onClick={() => {
          setCurrentPage('createChart')
        }} />

      <div id="capture" style={{ backgroundColor: bgColor }} >
        <ChartDisplay chart={chart} dataObject={dataObject} optionsObject={optionsObject} />
      </div>
    </div>
  );
}

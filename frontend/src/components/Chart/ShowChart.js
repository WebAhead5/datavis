import React from "react";
import htmlConverter from "./h2C/HtmlConverter";
import ChartDisplay from "./ChartDisplay";

export default function ShowChart({ setCurrentPage, chart, dataObject, optionsObject }) {
  return (
    <div style={{}}>

      <input type="button"
        className="btn btn-info"
        onClick={htmlConverter}
        value="Download Chart"
      />

      <input type="button"
        className="btn btn-warning ml-3"
        value="Edit"
        onClick={() => {
          setCurrentPage('createChart')
        }} />

      <div id="capture" >
        <ChartDisplay chart={chart} dataObject={dataObject} optionsObject={optionsObject} />
      </div>
    </div>
  );
}

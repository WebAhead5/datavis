import React from "react";
import htmlConverter from "./h2C/HtmlConverter";
import ChartDisplay from "./ChartDisplay";
import { toast } from "react-toastify";
import htmlToImage from 'html-to-image';

export default function ShowChart({ setCurrentPage, chart, dataObject, optionsObject, bgColor }) {

  console.log("DATA OB IS", dataObject)


  const handleSaveChart = async () => {
    try {

      var captureElement = document.querySelector("#capture");

      htmlToImage.toJpeg(captureElement, { quality: 0.95, backgroundColor: 'white' })
        .then(async (jpeg) => {

          const body = { jpeg };

          const response = await fetch("http://localhost:4000/chart/save", {
            method: "POST",
            headers: {
              jwt_token: localStorage.token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });

        })
        .catch((error) => {
          console.error('oops, something went wrong with the server!', error);
          toast.error(error)
        });

      toast.info("Chart Saved to Chart Hisotry")
    } catch (err) {

      console.error(err.message);
      toast.error("Chart could not be saved")
    }


  }


  return (
    <div className="showChart">

      <input type="button"
        className="btn btn-outline-primary mr-3"
        onClick={handleSaveChart}
        value="Save Chart to History"
      />

      <input type="button"
        className="btn btn-outline-info mr-3"
        onClick={htmlConverter}
        value="Download Chart"
      />

      <input type="button"
        className="btn btn-warning ml-3"
        value="Edit Chart"
        onClick={() => {
          setCurrentPage('createChart')
        }} />

      <div id="capture" style={{ backgroundColor: bgColor }} >
        <ChartDisplay chart={chart} dataObject={dataObject} optionsObject={optionsObject} />
      </div>
    </div>
  );
}

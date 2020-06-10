import React from "react";
import htmlConverter from "./h2C/HtmlConverter";
import ChartDisplay from "./ChartDisplay";
import { toast } from "react-toastify";
import htmlToImage from 'html-to-image';

export default function ShowChart({ setCurrentPage, chart, dataObject, optionsObject, bgColor }) {



  const handleSaveChart = async () => {
    try {

      var captureElement = document.querySelector("#capture");

      htmlToImage.toJpeg(captureElement, { quality: 0.95, backgroundColor: 'white' })
        .then(async (jpeg) => {

          const body = { jpeg };

          const response = await fetch( process.env.REACT_APP_API_URL + "/chart/save", {
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

      <div classname="showChartBtns">

        <span className="savebtns">
          <button
            className="saveChartBtn mr-3"
            onClick={handleSaveChart}
            value="SAVE TO CHART HISTORY">
            SAVE TO <b>CHART HISTORY</b></button>

          <button
            className="dlChartBtn mr-3"
            onClick={htmlConverter}
            value="DOWNLOAD CHART"
          >DOWNLOAD<b> CHART</b> </button>
        </span>

        <span className="editBtn">
          <button
            className="editChartBtn ml-3"
            value="EDIT CHART"
            onClick={() => {
              setCurrentPage('createChart')
            }}>EDIT <b>CHART</b></button>
        </span>

      </div>
      <div className="finalChart">
        <div className="finalSize" style={{ backgroundColor: bgColor }} >
          <div id="capture">
            <ChartDisplay chart={chart} dataObject={dataObject} optionsObject={optionsObject} />
          </div>
        </div>
      </div>
    </div>
  );
}

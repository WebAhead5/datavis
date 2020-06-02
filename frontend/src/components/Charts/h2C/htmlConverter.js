import html2canvas from "html2canvas";
import React from "react";
import { saveAs } from "file-saver";

const htmlConverter = () => {
  var canvasToTake = document.querySelector(".canvas");
  var captureElement = document.querySelector("#capture");
  html2canvas(captureElement, {
    windowWidth: "100%",
  }).then((canvas) => {
    document.body.append(canvas);
    var blob = new Blob([canvas], {
      type: "image/jpeg;charset=utf-8",
    });
    // element.click();
    // downloadFile(canvas, url)
    document.body.removeChild(canvas);
    // saveAs(blob, "chartImg.jpeg");
  });
};

// const downloadFile = (elementToDownload, url) => {

//     elementToDownload.src = url
// }

export default htmlConverter;

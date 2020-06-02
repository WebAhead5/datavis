// import html2canvas from "html2canvas";
import React from "react";
// import { saveAs } from "file-saver";


import htmlToImage from 'html-to-image';

const htmlConverter = () => {
    
      var captureElement = document.querySelector("#capture");
    
    
      htmlToImage.toJpeg(captureElement, {quality:0.95, backgroundColor:'white'})
      .then((dataUrl) => {
          var link = document.createElement('a');
          link.download = "myChart.jpeg";
          link.href = dataUrl;
          link.click();
      })
      .catch( (error) => {
        console.error('oops, something went wrong!', error);
      });

}




















// const htmlConverter = () => {
//   var canvasToTake = document.createElement('a')
//   var captureElement = document.querySelector("#capture");
//   html2canvas(captureElement, {
//     windowWidth: "100%",
//   }).then((canvas) => {
//     document.body.append(canvas);
//     var blob = new Blob([canvas], {
//       type: "image/jpeg;charset=utf-8",
//     });
//     canvasToTake.href = URL.createObjectURL(blob);
//     canvasToTake.download = "image.jpg";
//     canvasToTake.click();
//*************************** keep commented
    // captureElement.href = URL.createObjectURL(blob);
    // captureElement.click();
    // downloadFile(canvas, url)
    // document.body.removeChild(canvas);
//***************************
//     saveAs(blob, "chartImg.jpeg");
//   });
// };

// const downloadFile = (elementToDownload, url) => {

//     elementToDownload.src = url
// }

export default htmlConverter;

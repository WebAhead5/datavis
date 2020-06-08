import React from "react";
import htmlToImage from 'html-to-image';
import { ToastContainer, toast } from "react-toastify";

const htmlConverter = () => {

  var captureElement = document.querySelector("#capture");


  htmlToImage.toJpeg(captureElement, { quality: 0.95, backgroundColor: 'white' })
    .then((dataUrl) => {
      var link = document.createElement('a');
      link.download = "myChart.jpeg";
      link.href = dataUrl;
      link.click();


      toast.info("JPEG download")
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });

}


export default htmlConverter;
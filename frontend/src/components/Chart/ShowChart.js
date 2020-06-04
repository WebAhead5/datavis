import React from "react";
import htmlConverter from "./h2C/HtmlConverter";

export default function ShowChart({setCurrentPage}) {
  return (
    <div style={{marginLeft:"30%"}}>

      <input type="button"
       onClick={htmlConverter}
        value="Download"
         />

        <input type="button"
        value="Edit"
        className="ml-3" 
        onClick={()=> {
            setCurrentPage('createChart')
        }}/>

        <div id="capture" >
        <b style={{color:'red'}}>Click on Download and take a picture of me</b>
        </div>
    </div>
  );
}

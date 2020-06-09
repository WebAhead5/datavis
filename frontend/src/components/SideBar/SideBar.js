import React, { Fragment, useState, useEffect } from "react";
import SideContent from "./SideContent";
import "./navBar.css";
import ReactTooltip from 'react-tooltip'

export const SideBar = () => {
  const [visible, setVisible] = useState(false);


  return (
    <Fragment>
      <div className="navBar">
        <a data-tip="Click to lock Full Side Bar"> <button
          className="toggleButton"
          onClick={() => {
            setVisible(!visible);

          }}>
          <div className="toggleButton_line" />
          <div className="toggleButton_line" />
          <div className="toggleButton_line" />
        </button> </a>
        <ReactTooltip place="right" type="dark" effect="solid" />


      </div>
      <div > <SideContent visible={visible} /></div>
    </Fragment>
  );
};


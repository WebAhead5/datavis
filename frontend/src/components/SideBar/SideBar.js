import React, { Fragment, useState, useEffect } from "react";
import SideContent from "./SideContent";
import "./navBar.css";

export const SideBar = () => {
  const [visible, setVisible] = useState(false);


  return (
    <Fragment>
      <div className="navBar">
        <button
          className="toggleButton"
          onClick={() => {
            setVisible(!visible);

          }}>
          <div className="toggleButton_line" />
          <div className="toggleButton_line" />
          <div className="toggleButton_line" />
        </button>


      </div>
      <div > <SideContent visible={visible} />}</div>
    </Fragment>
  );
};


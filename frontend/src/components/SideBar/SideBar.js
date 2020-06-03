import React, { useState, useEffect } from "react";
import SideContent from "./SideContent";
import "./navBar.css";

export const SideBar = () => {
  const [visible, setVisible] = useState(false);


  return (
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
      <div>{visible && <SideContent visible={visible} />}</div>
    </div>
  );
};


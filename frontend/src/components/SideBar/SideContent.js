import React, { Fragment } from "react";
import { slide as Menu } from "react-burger-menu";
import "./navBar.css";
//icons
import dashboardIcon from "../../assets/images/customer.png";
import homeIcon from "../../assets/images/home-page.png";
import addIcon from "../../assets/images/add-table.png";
import tableIcon from "../../assets/images/table.png";
import historyIcon from "../../assets/images/time-machine.png";
////

const SideContent = (props) => {
  return (
    <nav >
      <div className={`sideContent ${props.visible ? 'activeSB' : ''}`}>
        <a className="menu-item" href="/">
          <img className='inner-bar-icon' src={homeIcon} />
          DASHBOARD
        </a>

        <a className="menu-item add" href="/addTable">
          <img className='inner-bar-icon' src={addIcon} />
          UPLOAD TABLE
        </a>

        <a className="menu-item tables" href="/tables">
          <img className='inner-bar-icon' src={tableIcon} />
          YOUR TABLES
        </a>

        <a className="menu-item history" href="/history">
          <img className='inner-bar-icon' src={historyIcon} />
          CHART HISTORY
        </a>

        <a className="menu-item user" href="/user">
          <img className='inner-bar-icon' src={dashboardIcon} />
          USER PAGE
        </a>

      </div>
    </nav>
  );
};

export default SideContent;

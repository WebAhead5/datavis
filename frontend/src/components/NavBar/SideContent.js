import React, { Fragment } from "react";
import { slide as Menu } from "react-burger-menu";
import './navBar.css'
//icons
import dashboardIcon from "../../assets/images/customer.png";
import homeIcon from "../../assets/images/home-page.png";
import addIcon from "../../assets/images/add-table.png";
import tableIcon from "../../assets/images/table.png";
import historyIcon from "../../assets/images/time-machine.png";
////

const SideContent = props => {
  return (
    <nav>
        <div className={`sideContent ${props.visible ? 'active' : ''}`}>
      <a className="menu-item" href="/">
      <img className='inner-bar-icon' src={homeIcon} />
        Dashboard
      </a>
      
      <a className="menu-item" href="/addTable">
      <img className='inner-bar-icon' src={addIcon} />
        Add New Table
      </a>

      <a className="menu-item" href="/tables">
      <img className='inner-bar-icon' src={tableIcon} />
        Tables
      </a>

      <a className="menu-item" href="/history">
      <img className='inner-bar-icon' src={historyIcon} />
        Chart History
      </a>

      <a className="menu-item" href="/userpage">
      <img className='inner-bar-icon' src={dashboardIcon} />
        User Page
      </a>
      </div>
    </nav>
  );
};

export default SideContent;

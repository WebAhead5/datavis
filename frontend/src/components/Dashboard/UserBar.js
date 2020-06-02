import React from 'react'
import { toast } from "react-toastify";
import { SideBar } from '../SideBar/SideBar'

// import logo from "../assets/images/logo1.png"

export default function UserBar({ name, setLoggedIn }) {

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setLoggedIn(false);
            toast.info("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };
    return (

        <div>
            <SideBar />
            <nav class="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: "#47567d", position:"fixed",top:'0', width:'100%' }}>

                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul class="navbar-nav mr-auto">
                        <img />
                        <li class="nav-item">
                            <a class="nav-link" href="/" style={{ fontSize: "24px", paddingLeft:'2rem' }}>Data<b>Vis</b></a>
                        </li>

                    </ul>
                </div>

                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/user"><b>{name.first_name} {name.last_name}</b></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="" onClick={e => logout(e)}>Logout</a>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
    )
}
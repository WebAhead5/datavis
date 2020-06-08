import React, { useEffect } from 'react'
import { toast } from "react-toastify";
import { SideBar } from '../SideBar/SideBar'

// import logo from "../assets/images/logo1.png"

export default function UserBar({ name, setName, setLoggedIn }) {

    const logout = async e => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            setLoggedIn(false);
            toast.info("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        setName(localStorage.getItem("username"))

    }, [])


    return (

        <div>

            <nav class="navbar navbar-expand-md navbar-dark fixed-top" style={{ backgroundColor: "#47567d" }}>

                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" style={{ minWidth: "35px" }}>
                            <SideBar />

                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/dashboard" style={{ fontSize: "24px" }}>data<b>vis</b></a>
                        </li>

                    </ul>
                </div>

                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/user"><b>{name}</b></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/" onClick={e => logout(e)}>Logout</a>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
    )
}
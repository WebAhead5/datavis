import React from 'react'
import Popup from "reactjs-popup";
import Login from "../Auth/Login";
import './NavBar.css'

// import logo from "../assets/images/logo1.png"

export default function NavBar({ setLoggedIn }) {
    return (


        <div>
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul class="navbar-nav mr-auto">
                        <img />
                        <li class="nav-item">
                            <a class="nav-link" href="/" style={{ fontSize: "24px", color: "#47567d" }}>data<b>vis</b></a>
                        </li>

                    </ul>
                </div>

                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <div class="nav-link pointer" href="">
                                <Popup trigger={<span><b>Login</b> </span>} position="left top"
                                    closeOnDocumentClick>
                                    <div>
                                        <Login setLoggedIn={setLoggedIn} />
                                    </div>
                                </Popup>
                            </div>

                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register">Register</a>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
    )
}


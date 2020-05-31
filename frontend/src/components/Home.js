import React from "react";
import { Link, Redirect } from "react-router-dom";

import Slideshow from "./SlideShow"

import Popup from "reactjs-popup";
//components


import Login from "./Login";

function Home({ setLoggedIn }) {
    return (
        <div className="bg">

            <h1 className="mt-5 text-center" style={{ color: "white" }}>Home</h1>

            <Popup trigger={<button> Login</button>} position="right center">
                <div>
                    <Login setLoggedIn={setLoggedIn} />
                </div>
            </Popup>
            <Slideshow />

        </div>
    );
}

export default Home;

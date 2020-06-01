import React from "react";
import { Link, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from './Footer'

import Slideshow from "./SlideShow"
import Register from "../Auth/Register";


function Home({ setLoggedIn }) {
    return (

        <div className="bg">
            <NavBar setLoggedIn={setLoggedIn} />
            <Slideshow />
            <Footer />


        </div>
    );
}

export default Home;

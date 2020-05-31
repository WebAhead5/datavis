import React from 'react'
import { Link, Redirect } from "react-router-dom";
import Slideshow from "./SlideShow"

function Home() {

    return (
        <div>
            <h1 className="mt-5 text-center">Home</h1>

            <h4><Link to="/login">login</Link></h4>
            <h4><Link to="/register">register</Link></h4>

            <Slideshow />
        </div>
    )
}

export default Home

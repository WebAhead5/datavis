import React from "react";
import { Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
//components

import Login from "./Login";

function Home({ setLoggedIn }) {
  return (
    <div>
      <h1 className="mt-5 text-center">Home</h1>
      <Popup trigger={<button> Login</button>} position="right center">
        <div>
          <Login setLoggedIn={setLoggedIn} />
        </div>
      </Popup>

      <h4>login</h4>
      <h4>
        <Link to="/register">register</Link>
      </h4>
    </div>
  );
}

export default Home;

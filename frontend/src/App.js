import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components

import Register from "./components/Auth/Register";
import Home from "./components/Welcome/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Table from "./components/Table/Table"
import CreateChart from './components/Chart/CreateChart'


//for log in & log out pop ups
toast.configure({
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});


//fixes bootstrap issue with background
document.body.style = 'background: inherit;';

function App() {
  //state for if logged in or not
  const [loggedIn, setLoggedIn] = useState(false);

  //states for current user
  const [name, setName] = useState("");

  //core data for sleected table
  const [data, setData] = React.useState()

  //Function to check if user has a valid JWT token already
  const CheckLoggedIn = async () => {
    try {
      console.log("checkAuthRun");
      //Send JWT to server to check if valid
      const res = await fetch("http://localhost:4000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      //response from server (only if JWT token is valid, else error)
      const parseRes = await res.json();

      //if valid JWT, set Auth to true
      parseRes === true ? setLoggedIn(true) : setLoggedIn(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  //on App load, run above function
  useEffect(() => {
    CheckLoggedIn();
  }, []);

  console.log("logged in", loggedIn)

  //Render
  return (
    <Fragment>

      <div style={{ height: '100vh' }}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !loggedIn ? (
                  <Home {...props} setLoggedIn={setLoggedIn} />
                ) : (
                    <Redirect to="/dashboard" />
                  )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !loggedIn ? (
                  <Register {...props} setLoggedIn={setLoggedIn} />
                ) : (
                    <Redirect to="/dashboard" />
                  )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                loggedIn ? (
                  <Dashboard {...props} setLoggedIn={setLoggedIn} name={name} setName={setName} />
                ) : (
                    <Redirect to="/" />
                  )
              }
            />
            <Route
              exact
              path="/addTable"
              render={(props) =>
                // loggedIn ?
                (
                  <Table {...props} setLoggedIn={setLoggedIn} name={name} setName={setName} data={data} setData={setData} />
                )
                // : (
                //   <Redirect to="/" />
                // )
              }
            />
            <Route
              exact
              path="/createChart"
              render={(props) =>
                // loggedIn ?
                (
                  <CreateChart {...props} setLoggedIn={setLoggedIn} name={name} setName={setName} data={data} setData={setData} />
                )
                // : (
                //   <Redirect to="/" />
                // )
              }
            />
            <Route path="/*" >
              <h2 className="text-center mt-5" style={{ color: "grey" }}>404 page not found</h2>
            </Route>
          </Switch>
        </Router>
      </div>
    </Fragment>

  );
}

export default App;

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";
// import { useForm } from "../Dashboard/useForm";
import NavBar from "../Welcome/NavBar";
import Footer from '../Welcome/Footer';
import PasswordAuth from "./passwordAuth";

const corsDataVis = "https://cors-anywhere.herokuapp.com/https://datavisbackend.herokuapp.com/"

const Register = ({ setLoggedIn }) => {
  //state for current inuts in register fields
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
  });

  //get varibles from input state
  const { email, password, first_name, last_name, confirm_password } = inputs;

  //function to change state based on current inputs in form
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  //function to submit register form
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirm_password) {
        toast.error("Passwords do not match");
        return;
      }
      //send request to server to register
      const body = { email, password, first_name, last_name };
      const response = await fetch(`${corsDataVis}/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'origin': 'x-requested-with'
        },
        body: JSON.stringify(body),
      });

      //if successful, server will respond with valid JWT token
      const parseRes = await response.json();

      //if JWT token, save it in local storage
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setLoggedIn(true);
        toast.info("Register Successfully");

        //else error and you are not logged in
      } else {
        setLoggedIn(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg">

      <NavBar setLoggedIn={setLoggedIn} />
      <h1 className="mt-5 text-center title">Register a Free Account with <b>datavis</b></h1>
      <form className="formContainer" onSubmit={onSubmitForm}>
        <div className="names">
          <label htmlFor="firstName" />
          <input
            type="text"
            name="first_name"
            className="firstName"
            placeholder="First name"
            value={first_name}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="lastName" />
          <input
            type="text"
            name="last_name"
            className="lastName"
            placeholder="Last name"
            value={last_name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <label htmlFor="email" />
        <input
          name="email"
          className="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => onChange(e)}
        />
        <div className="passwordContainer">
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            className="password"
            placeholder="Password"
            password={password}
            value={password}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="confirmPassword" />
          <input
            type="password"
            name="confirm_password"
            className="confirmPassword"
            placeholder="Confirm password"
            value={confirm_password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <label htmlFor="submit" />
        <input type="submit" className="submit my-4" value="Register" />
      </form>
      <div className="text-center mt-4"><span><Link to="/">Already have an account?</Link>  <Link to="/"> | To Homepage</Link></span></div>
      <Footer />
    </div>
  );
};

export default Register;

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setLoggedIn }) => {
    //states for current inputs in login field
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    //get varibles from the state
    const { email, password } = inputs;

    //function for setting state from inout feilds
    const onChange = (e) =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    //function for submitting loging form
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });

            //server will respond with a valid JWT token, or an error
            const parseRes = await response.json();

            //if JWT token, save it in local storage
            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);

                setLoggedIn(true);

                toast.info("Logged in Successfully");

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
        <Fragment>


            <h1 className="mt-1 text-center">Login</h1>
            <form onSubmit={onSubmitForm} className="mt-1 mx-1">
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    className="form-control my-3"
                />
                <button className="btn btn-info btn-block">Log In</button>
            </form>

        </Fragment>
    );
};

export default Login;

import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setLoggedIn }) => {

    //state for current inuts in register fields
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    //get varibles from input state
    const { email, password, first_name, last_name } = inputs;

    //function to change state based on current inputs in form
    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    //function to submit register form
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            //send request to server to register
            const body = { email, password, first_name, last_name };
            const response = await fetch(
                "http://localhost:4000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

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
        <Fragment>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 className="mt-5 text-center">Register</h1>
                    <form onSubmit={onSubmitForm}>
                        <input
                            type="text"
                            name="first_name"
                            value={first_name}
                            placeholder="first name"
                            onChange={e => onChange(e)}
                            className="form-control my-3"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={last_name}
                            placeholder="last name"
                            onChange={e => onChange(e)}
                            className="form-control my-3"
                        />
                        <input
                            type="text"
                            name="email"
                            value={email}
                            placeholder="email"
                            onChange={e => onChange(e)}
                            className="form-control my-3"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="password"
                            onChange={e => onChange(e)}
                            className="form-control my-3"
                        />

                        <button className="btn btn-info btn-block">Submit</button>
                    </form>
                    <Link to="/login">login</Link>
                </div>
                <div className="col-4"></div>
            </div>
        </Fragment>
    );
};

export default Register;
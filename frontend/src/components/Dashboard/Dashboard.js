import React, { useEffect, useState } from "react";
import UserBar from '../UserBar/UserBar'

const Dashboard = ({ setLoggedIn, name, setName }) => {

    let username = ""

    //function to get info for dashboard based on ID in JWT token
    const getProfile = async () => {
        try {

            //call API for user infomation for use in dashboard
            const res = await fetch("http://localhost:4000/dashboard/", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            console.log("dashboard data", parseData)

            //use info to set states - such as name

            username = `${parseData.first_name} ${parseData.last_name}`
            localStorage.setItem("username", username);
            setName(username)

            //setTables (that belong to current user, by table ID)

        } catch (err) {
            console.error(err.message);
        }
    };

    //run above code when dashboard loads 
    useEffect(() => {
        getProfile();
    }, []);



    //render
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">USER<b> DASHBOARD</b></h1>
            <h2 className="mt-5 text-center">Welcome {name}</h2>

            <h4 className="mt-5 text-center">To start using datavis, please <a href="/addTable" style={{ color: "#47567d", textDecoration: "underline" }}>add a new table</a> of data to begin creating charts.</h4>


            <h4 className="mt-5 text-center">or access your exisiting data tables <a href="/tables" style={{ color: "#47567d", textDecoration: "underline" }}>here</a>.</h4>

        </div>
    );
};

export default Dashboard;

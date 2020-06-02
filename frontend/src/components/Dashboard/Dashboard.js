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

    //Logout - deletes JWT token from local storage


    //render
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="mt-5 text-center">Dashboard</h1>
            <h2 className="mt-5 text-center">Welcome {name}</h2>

        </div>
    );
};

export default Dashboard;

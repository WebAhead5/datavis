import React, { useEffect, useState } from "react";
import UserBar from './UserBar'

const Dashboard = ({ setLoggedIn }) => {

    //states for current user
    const [name, setName] = useState({ first_name: "", last_name: "" });

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
            setName({ ...name, first_name: parseData.first_name, last_name: parseData.last_name });

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
            <UserBar name={name} setLoggedIn={setLoggedIn} />
            <h1 className="mt-5">Dashboard</h1>
            <h2>Welcome {name.first_name} {name.last_name}</h2>

        </div>
    );
};

export default Dashboard;

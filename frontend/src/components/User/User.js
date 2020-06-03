import React, {useEffect, useState} from 'react'
import UserBar from '../UserBar/UserBar'

export default function User({ name,setName, setLoggedIn }) {



    const getEmail = async () => {
        try {

            //call API for user infomation for use in dashboard
            const res = await fetch("http://localhost:4000/user/", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            
            console.log("email data", parseData)

            //use info to set states - such as name
            localStorage.setItem("email", parseData);
            

            //setTables (that belong to current user, by table ID)

        } catch (err) {
            console.error(err.message);
        }
    };



    useEffect(() => {
        getEmail();
    }, []);


    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">USER PAGE</h1>
            <h3>display user info</h3>
        </div>
    )
}

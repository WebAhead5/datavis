import React, { useEffect, useState } from 'react'
import UserBar from '../UserBar/UserBar'
import { parse } from 'papaparse';
import userImage from '../../assets/images/userimage.svg'
import getTables from '../../utils/getTables';
import getTable from '../../utils/getTables'
import './user.css'

export default function User({ name, setName, setLoggedIn, setTableList, tableList }) {

    const [email, setEmail] = useState();

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
            setEmail(parseData)

        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getEmail();
        getTable(setTableList);
    }, []);


    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">USER <b>PAGE</b></h1>
            <div class="container middleUser">
                <div class="row">
                    <div class="col-3">

                    </div>
                    <div class="col-6">
                        <ul className="list-group mt-5" style={{ listStyle: "none" }}>
                            <li className="text-center list-group-item imgList">
                                <img src={userImage} className="userImg" />
                            </li>
                            <li className="list-group-item">
                                <b>Name: </b>{name}
                            </li>
                            <li className="list-group-item">
                                <b>Email: </b>{email}
                            </li>
                            <li className="list-group-item">
                                <b>You have {tableList.length} tables uploaded to datavis: </b>{tableList.map((table) => (<li>{table.table_name}</li>))}
                            </li>
                            <li className="list-group-item" style={{ color: "#47567d" }}>
                                <u>Try Premium!</u>
                            </li>
                            <li className="list-group-item">
                                <u>Change Password</u>
                            </li>

                            <li className="mt-5 text-center"><b>Logout</b></li>
                            <li className="my-4 text-center">Delete Account</li>
                        </ul>
                    </div>
                    <div class="col-3">
                    </div>
                </div>
            </div>
        </div>
    )
}



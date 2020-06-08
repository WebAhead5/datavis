import React, { useState, useEffect, Fragment } from 'react'
import UserBar from '../UserBar/UserBar'
import './chartHistory.css'

export default function History({ name, setName, setLoggedIn }) {

    const [chartHistory, setChartHistory] = useState([]);


    const getHistory = async (setTableList) => {
        try {

            //call API for user infomation for use in tables page
            const res = await fetch("http://localhost:4000/chart/history", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            //result from DB request on backend - will send default info

            const parseData = await res.json()

            setChartHistory(parseData)


        } catch { }

    }


    useEffect(() => {
        getHistory();
    }, []);




    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">CHART<b> HISTORY</b></h1>
            <h3>display chart history</h3>
            {chartHistory.map((chart) => (
                <Fragment>
                    <div className="text-center">
                        <img className="chartImg" src={chart.jpeg} />
                        <div className="">CHART ID: {chart.chart_id}</div>
                        <button className="btn btn-danger">DELETE CHART</button>
                    </div>
                </Fragment>
            ))}

        </div>
    )
}
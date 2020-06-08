import React, { useState, useEffect, Fragment } from 'react'
import UserBar from '../UserBar/UserBar'
import './chartHistory.css'
import { toast } from "react-toastify";

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

    const handleDownload = (chart) => {
        console.log("handle download fired")

        var link = document.createElement('a');
        link.download = `myChart-id${chart.chart_id}.jpeg`;
        link.href = chart.jpeg;
        link.click();
        toast.info("JPEG downloaded")
    }


    const handleDelete = async (chart) => {
        try {
            console.log("del chart clicked, id", chart.chart_id);
            const body = { chart };
            //call API for user infomation for use in dashboard
            const res = await fetch("http://localhost:4000/chart/delete", {
                method: "POST",
                headers: {
                    jwt_token: localStorage.token,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(body),
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            console.log(parseData);

            toast.error(`Chart has been deleted from Chart History`);

        } catch (err) {
            console.error(err.message);
            toast.error(`Chart could not be deleted!`);
        }
    };


    useEffect(() => {
        getHistory();
    }, [handleDelete]);




    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">CHART<b> HISTORY</b></h1>
            <h3>display chart history</h3>
            {chartHistory.reverse().map((chart) => (
                <Fragment>
                    <div className="text-center">
                        <img className="chartImg" src={chart.jpeg} />
                        <div className="">CHART ID: {chart.chart_id}</div>
                        <button className="btn btn-primary mx-2" onClick={() => handleDownload(chart)}>DOWNLOAD CHART</button>
                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(chart)}>DELETE CHART</button>
                    </div>
                </Fragment>
            ))}

        </div>
    )
}
import React, { useState, useEffect } from 'react'
import UserBar from '../UserBar/UserBar'
import RenderTable from './RenderTable'

export default function Tables({ name, setName, setLoggedIn, data, setData, cols, setCols }) {

    const [selectedTable, setSelectedTable] = useState("");
    const [tableList, setTableList] = useState([1, 2, 3]);

    let dataVars = { cols, data, setData }


    //select data once table selected
    useEffect(() => {

        if (selectedTable !== "") {

            let extractedData = ""
            tableList.forEach(row => {
                if (row.table_id === parseInt(selectedTable)) {
                    extractedData = JSON.parse(row.data)
                }
            })

            console.log("ex data", extractedData)
            setData(extractedData)

            localStorage.setItem("tabledata", JSON.stringify(extractedData));
            console.log("table selected is", extractedData)

            let keys = Object.keys(extractedData[0]);
            setCols(keys)
            localStorage.setItem("cols", JSON.stringify(keys))
        }
        console.log("DATA FOR TABLE IS", data)

    }, [selectedTable]);



    //function to get info for dashboard based on ID in JWT token
    const getTables = async () => {
        try {

            //call API for user infomation for use in tables page
            const res = await fetch("http://localhost:4000/table/getTables", {
                method: "POST",
                headers: { jwt_token: localStorage.token }
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            console.log("table data", parseData)
            setTableList(parseData)



        } catch (err) {
            console.error(err.message);
        }
    };

    //run above code when dashboard loads 
    useEffect(() => {
        getTables();
    }, []);


    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">TABLES</h1>
            <h3>display exisiting user tables here or in drop down</h3>

            <fieldset>
                <legend> Select Table</legend>
                <label htmlFor="table"> </label>
                <select className="" onChange={e => setSelectedTable(e.target.value)}>
                    <option style={{ color: "grey" }}>Select</option>
                    {tableList.map((tableList, index) => (
                        <option value={tableList.table_id} key={index}>{tableList.table_name}</option>
                    ))}
                </select>
            </fieldset>


            {data ? <RenderTable {...dataVars} />
                : <div></div>}
        </div>
    )
}

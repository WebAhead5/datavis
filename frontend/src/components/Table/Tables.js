import React, { useState, useEffect } from 'react'
import UserBar from '../UserBar/UserBar'
import RenderTable from './RenderTable'
import { toast } from "react-toastify";
import Popup from "reactjs-popup";

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


    const deleteTable = async () => {
        try {
            let table_id = selectedTable
            console.log("del table clicked, id", selectedTable)
            const body = { table_id };
            //call API for user infomation for use in dashboard
            const res = await fetch("http://localhost:4000/table/delete", {
                method: "POST",
                headers: { jwt_token: localStorage.token, "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            console.log(parseData)
            toast.error(`Table: ${selectedTable} has been deleted`)

            //reset page
            getTables();
            localStorage.removeItem("tabledata");
            setData(null)


        } catch (err) {
            console.error(err.message);
            toast.info(`${selectedTable} could not be deleted!`)
        }
    };





    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">YOUR <b>TABLES</b></h1>
            <div className="text-center mt-4">
                <span>Please select a table to work from  </span>
                <label htmlFor="table"> </label>
                <select className="" onChange={e => setSelectedTable(e.target.value)}>
                    <option style={{ color: "grey" }}>Select</option>
                    {tableList.map((tableList, index) => (
                        <option value={tableList.table_id} key={index}>{tableList.table_name}</option>
                    ))}
                </select>



            </div>







            {data ?
                <div>
                    <div className="tableButtons">
                        <div className="genDiv">
                            <a href="/createChart" ><button className="genChartBtn">GENERATE<b> CHART</b></button></a>
                        </div>

                        <div className="delDiv">
                            <Popup trigger={<button className="delChartBtn" >DELETE <b>TABLE</b> </button>} modal
                                closeOnDocumentClick>
                                <div className="text-center">
                                    Are you sure you want to delete this table? Table data cannot be restored
                                    <button className="delChartBtn" onClick={deleteTable}>CONFIRM <b>DELETE</b></button>
                                </div>
                            </Popup>
                        </div>
                    </div>
                    <div className="tableDiv">
                        <RenderTable {...dataVars} />
                    </div>
                </div>
                : <div></div>}
        </div>
    )
}



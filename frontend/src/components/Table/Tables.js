import React, { useState, useEffect } from 'react'
import UserBar from '../UserBar/UserBar'
import RenderTable from './RenderTable'
import TableButtons from './TableButtons'
import getTables from '../../utils/getTables'


export default function Tables({ name, setName, setLoggedIn, data, setData, cols, setCols, tableList, setTableList }) {

    const [selectedTable, setSelectedTable] = useState("");
    const [tableName, setTableName] = useState("");


    let dataVars = { cols, data, setData }



    //select data once table selected
    useEffect(() => {

        if (selectedTable !== "") {

            let extractedData = ""
            tableList.forEach(row => {
                if (row.table_id === parseInt(selectedTable)) {
                    extractedData = JSON.parse(row.data)
                }
            });

            //   console.log("ex data", extractedData);
            setData(extractedData);

            localStorage.setItem("tabledata", JSON.stringify(extractedData));
            console.log("table selected is", extractedData);

            let keys = Object.keys(extractedData[0]);
            // console.log('extea' , extractedData[0]);
            setCols(keys);
            localStorage.setItem("cols", JSON.stringify(keys));
        }


        tableList.forEach(row => {
            if (row.table_id === parseInt(selectedTable)) {
                setTableName(row.table_name)
            }
        })

    }, [selectedTable]);




    useEffect(() => {
        getTables(setTableList)
    }, []);




    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">YOUR <b>TABLES</b></h1>
            <div className="text-center mt-4">
                <span>Please select a table to work from  </span>
                <label htmlFor="table"> </label>
                <select className="" defaultValue onChange={e => setSelectedTable(e.target.value)}>
                    <option style={{ color: "grey" }} disabled  >Select</option>
                    {tableList.map((tableList, index) => (
                        <option value={tableList.table_id} key={index}>{tableList.table_name}</option>
                    ))}
                </select>
            </div>



            {data && selectedTable ?
                <div>
                    <TableButtons setData={setData} selectedTable={selectedTable} tableList={tableList} tableName={tableName} setTableName={setTableName} setTableList={setTableList} />
                    <div className="tableDiv">
                        <RenderTable {...dataVars} />
                    </div>
                </div>
                : <div></div>}
        </div>
    )
}


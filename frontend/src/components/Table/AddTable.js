import React, { useState } from 'react'
import RenderTable from './RenderTable'
import FileUpload from '../FileUpload/FileUpload'
import UserBar from '../UserBar/UserBar'
import './addTable.css'
import TableButtons from './TableButtons'
import getTables from '../../utils/getTables'



const AddTable = ({ props, setLoggedIn, name, setName, data, setData, cols, setCols, setTableList, tableList }) => {

    const [tableName, setTableName] = useState("table name required")

    const dataVars = { data, setData, cols, setCols };

    const [currentTableId, setCurrentTableId] = useState();

    React.useEffect(() => {
        if (data) {
            let keys = Object.keys(data[0]);
            setCols(keys)
            localStorage.setItem("cols", JSON.stringify(keys))
        }

        getTables(setTableList);



    }, [data]);




    return (

        <div className="App" style={{ marginTop: "100px" }}>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">UPLOAD <b>TABLE</b></h1>
            <div className="text-center mt-4">

            </div>
            <FileUpload {...dataVars} tableName={tableName} setTableName={setTableName} setCurrentTableId={setCurrentTableId} />
            {data ?
                <div>
                    <TableButtons setData={setData}
                        selectedTable={currentTableId} tableList={tableList}
                        tableName={tableName} setTableName={setTableName}
                        setTableList={setTableList}

                    />
                    <div className="tableDiv">
                        <RenderTable {...dataVars} />
                    </div>
                </div>
                : <div></div>}
        </div>

    );
}

export default AddTable;
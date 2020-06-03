import React, { useEffect } from 'react'
import Papa from 'papaparse'
import { toast } from "react-toastify";
import './FileUpload.css'

const FileUpload = ({ data, setData }) => {

    const [csvFile, setCSV] = React.useState()

    const handleChange = event => {
        setCSV(event.target.files[0])
    };

    const importCSV = () => {
        Papa.parse(csvFile, {
            complete: updateData,
            header: true
        });
    };

    const [tableName, setTableName] = React.useState("table name required")

    const uploadTable = async (table_name, data) => {
        try {
            const body = { table_name, data };
            //call API for user infomation for use in dashboard
            const res = await fetch("http://localhost:4000/table/addTable", {
                method: "POST",
                headers: { jwt_token: localStorage.token, "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            console.log(parseData)
            toast.info(`${csvFile.name} succesfully uploaded as ${tableName.toUpperCase()}`)


        } catch (err) {
            console.error(err.message);
            toast.error(`there has been an error uploading ${tableName}, please try again`)
        }
    };

    const updateData = (result) => {
        let finalData = result.data.slice(0, -1)
        setData(finalData)
        localStorage.setItem("tabledata", JSON.stringify(finalData));
        uploadTable(tableName, JSON.stringify(finalData))

    };

    useEffect(() => {
        if (csvFile) {
            importCSV();
        }
    }, [csvFile])

    return (
        <div className="text-center mt-3 fileDiv">


            <div className="mt-3">
                TABLE <b>NAME</b>: <input tableName={tableName} onChange={e => setTableName(e.target.value)} required />
            </div>

            {tableName != "table name required" && tableName != "" ?
                <div class="upload-btn-wrapper mt-3">
                    <button class="btn activeBtn">SELECT FILE</button>
                    <input
                        className="activeBtn"
                        type="file"
                        name="file"
                        placeholder={null}
                        onChange={handleChange}
                    />
                </div>


                : <div class="upload-btn-wrapper mt-3 disabled">
                    <span class="btn disabled notActive ">SELECT FILE</span>

                </div>}




        </div>

    )

}

export default FileUpload
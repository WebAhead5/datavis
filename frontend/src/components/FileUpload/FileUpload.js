import React from 'react'
import Papa from 'papaparse'

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

    const [tableName, setTableName] = React.useState("please enter table name")

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


        } catch (err) {
            console.error(err.message);
        }
    };

    const updateData = (result) => {
        let finalData = result.data.slice(0, -1)
        setData(finalData)
        localStorage.setItem("tabledata", JSON.stringify(finalData));
        uploadTable(tableName, JSON.stringify(finalData))

    };

    return (
        <div>

            <h2 className="text-center mt-5">Import Table - please upload a CSV file</h2>
            <input
                className="csv-input"
                type="file"
                // ref={input => {
                //     this.filesInput = input;
                // }}
                name="file"
                placeholder={null}
                onChange={handleChange}
            />
            <p />
            Table Name:<input tableName={tableName} onChange={e => setTableName(e.target.value)} />
            <button onClick={importCSV}> Upload now!</button>

        </div>

    )

}

export default FileUpload
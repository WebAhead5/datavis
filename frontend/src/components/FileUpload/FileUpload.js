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

    const updateData = (result) => {
        setData(result.data.slice(0, -1))
        localStorage.setItem("tabledata", JSON.stringify(result.data.slice(0, -1)));
    };

    return (
        <div>

            <h2>Import CSV File!</h2>
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
            <button onClick={importCSV}> Upload now!</button>

        </div>

    )

}

export default FileUpload
import React, { useEffect } from 'react'
import Papa from 'papaparse'
import { toast } from "react-toastify";
import './FileUpload.css'
import XLSX from "xlsx"
import ReactTooltip from 'react-tooltip'

const FileUpload = ({ data, setData, tableName, setTableName, setCurrentTableId }) => {

    const [file, setFile] = React.useState()

    const handleChange = event => {
        setFile(event.target.files[0])
    };

    const importFile = () => {


        if (file.type === "text/csv") {
            Papa.parse(file, {
                complete: extractJsonData,
                header: true
            });
        } else if (file.type === "application/json") {

            var reader = new FileReader();
            reader.onload = function (event) {
                let jsonData = event.target.result
                uploadTable(tableName, jsonData)
                setData(JSON.parse(jsonData))
                localStorage.setItem("tabledata", jsonData);
            };
            reader.readAsText(file);

        } else if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {

            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var data = event.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach(sheet => {
                    let xlsData = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    uploadTable(tableName, JSON.stringify(xlsData))
                    setData(xlsData)
                    localStorage.setItem("tabledata", JSON.stringify(xlsData));

                });
            };
            fileReader.readAsBinaryString(file);

        } else {
            toast.error(`file type ${file.type} is not currently supported on datavis`)
        }
    };


    const uploadTable = async (table_name, data) => {
        try {

            const body = { table_name, data };
            //call API for user infomation for use in dashboard
            const res = await fetch( process.env.REACT_APP_API_URL + "/table/addTable", {
                method: "POST",
                headers: { jwt_token: localStorage.token, "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

            //result from DB request on backend - will send default info
            const parseData = await res.json();
            setCurrentTableId(parseData)
            toast.info(`${file.name} succesfully uploaded as ${tableName.toUpperCase()}`)


        } catch (err) {
            console.error(err.message);
            toast.error(`there has been an error uploading ${tableName}, please try again`)
        }
    };

    const extractJsonData = (result) => {
        let finalData = result.data.slice(0, -1)
        setData(finalData)
        localStorage.setItem("tabledata", JSON.stringify(finalData));
        uploadTable(tableName, JSON.stringify(finalData))

    };

    useEffect(() => {
        if (file) {
            importFile();
        }
    }, [file])

    return (
        <div className="text-center mt-3 fileDiv">


            <div className="mt-3">
                <a data-tip="supporting CSV, JSON & XLSX"> TABLE <b>NAME</b>: <input tableName={tableName} onChange={e => setTableName(e.target.value)} required />
                </a>

                <ReactTooltip place="right" type="dark" effect="solid" />
            </div>

            {tableName != "table name required" && tableName.trimStart() ?
                <div class="upload-btn-wrapper mt-3">
                    <button className="btn Filebtn activeBtn">SELECT FILE</button>
                    <input
                        className="activeBtn"
                        type="file"
                        name="file"
                        placeholder={null}
                        onChange={handleChange}
                    />
                </div>


                : <div class="upload-btn-wrapper mt-3 disabled">
                    <span class="btn Filebtn disabled notActive ">SELECT FILE</span>

                </div>}




        </div>

    )

}

export default FileUpload
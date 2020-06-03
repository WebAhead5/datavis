import React from 'react'
import RenderTable from './RenderTable'
import FileUpload from '../FileUpload/FileUpload'
import UserBar from '../UserBar/UserBar'
import { toast } from "react-toastify";
import './addTable.css'
import Popup from "reactjs-popup";



const AddTable = ({ props, setLoggedIn, name, setName, data, setData, cols, setCols }) => {



    const dataVars = { data, setData, cols, setCols }

    React.useEffect(() => {
        if (data) {
            let keys = Object.keys(data[0]);
            setCols(keys)
            localStorage.setItem("cols", JSON.stringify(keys))
        }
    }, [data]);


    //duplicated code FIXME: 

    const deleteTable = async () => {
        //     try {
        //         let table_id = selectedTable
        //         console.log("del table clicked, id", selectedTable)
        //         const body = { table_id };
        //         //call API for user infomation for use in dashboard
        //         const res = await fetch("http://localhost:4000/table/delete", {
        //             method: "POST",
        //             headers: { jwt_token: localStorage.token, "Content-type": "application/json" },
        //             body: JSON.stringify(body)
        //         });

        //         //result from DB request on backend - will send default info
        //         const parseData = await res.json();
        //         console.log(parseData)
        //         toast.error(`Table: ${selectedTable} has been deleted`)

        //         //reset page
        //         localStorage.removeItem("tabledata");
        //         setData(null)


        //     } catch (err) {
        //         console.error(err.message);
        //         toast.info(`${selectedTable} could not be deleted!`)
        //     }
    };


    return (

        <div className="App">
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">UPLOAD <b>TABLE</b></h1>
            <div className="text-center mt-4">

            </div>
            <FileUpload {...dataVars} />
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

    );
}

export default AddTable;
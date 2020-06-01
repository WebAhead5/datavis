import React from 'react'
import RenderTable from './RenderTable'
import FileUpload from '../FileUpload/FileUpload'
import UserBar from '../UserBar/UserBar'
import './Table.css'



const Table = ({ props, setLoggedIn, name, setName, data, setData }) => {


    const [cols, setCols] = React.useState()

    const dataVars = { data, setData, cols, setCols }

    React.useEffect(() => {
        if (data) {
            let keys = Object.keys(data[0]);
            setCols(keys)
        }
    }, [data]);


    return (

        <div className="App">
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <FileUpload {...dataVars} />
            {cols && data ?
                <div>
                    <a href="/createChart" className="genChartBtn">Generate Chart!</a>
                    <RenderTable {...dataVars} />

                </div>
                : <div></div>}

        </div>

    );
}

export default Table;
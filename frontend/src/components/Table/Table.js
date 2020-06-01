import React from 'react'
import RenderTable from './RenderTable'
import FileUpload from '../FileUpload/FileUpload'
import UserBar from '../Dashboard/UserBar'



const Table = ({ props, setLoggedIn, name }) => {

    const [data, setData] = React.useState()
    const [cols, setCols] = React.useState()

    const dataVars = { data, setData, cols, setCols }

    const [x, setX] = React.useState("")
    const [y, setY] = React.useState("")





    React.useEffect(() => {
        if (data) {
            let keys = Object.keys(data[0]);
            setCols(keys)
            setX("")
            setY("")
            console.log("Latest Uploaded data is:")
        }
    }, [data]);


    return (

        <div className="App">
            <UserBar name={name} setLoggedIn={setLoggedIn} />
            <FileUpload {...dataVars} />
            {cols && data ? <RenderTable {...dataVars} /> : <div></div>}
        </div>

    );
}

export default Table;
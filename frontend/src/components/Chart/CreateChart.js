import React from 'react'
import UserBar from '../UserBar/UserBar'
import RenderChart from './RenderChart'



export default function CreateChart({ setLoggedIn, name, setName, data, setData, cols, setCols }) {


    const [x, setX] = React.useState("")
    const [y, setY] = React.useState("")

    const chartVars = { x, y, setX, setY }

    const dataVars = { data, setData, cols, setCols }


    // React.useEffect(() => {
    //     if (data) {
    //         let keys = Object.keys(data[0]);
    //         setCols(keys)
    //         setX("")
    //         setY("")
    //         console.log("Latest Uploaded data is:")
    //     }
    // }, [data]);


    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1>Create Chart</h1>
            <RenderChart {...dataVars} {...chartVars} />
        </div>
    )
}

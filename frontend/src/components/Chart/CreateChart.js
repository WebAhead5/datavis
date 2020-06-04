import React, { Fragment } from 'react'
import UserBar from '../UserBar/UserBar'
import RenderChart from './RenderChart'
import ShowChart from './ShowChart'



export default function CreateChart({ setLoggedIn, name, setName, data, setData, cols, setCols }) {


    const [x, setX] = React.useState("")
    const [y, setY] = React.useState("")

    const chartVars = { x, y, setX, setY }

    const dataVars = { data, setData, cols, setCols }

    const [currentPage, setCurrentPage] = React.useState('createChart')

    const changePage = () => {

        if (currentPage === 'createChart') setCurrentPage('showChart')
        else setCurrentPage('createChart')
    }


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
            <button onClick={changePage}>BUTTON CHANGE PAGE</button>
            {currentPage === 'createChart'  ? 
            <Fragment>
            <h1 className="text-center mt-5">GENERATE <b>CHART</b></h1>
            <RenderChart {...dataVars} {...chartVars} />
            </Fragment>
            : 
            <Fragment>         
            <h1 className="text-center mt-5">SHOW <b>CHART</b></h1>
            <ShowChart />
            </Fragment>}
        </div>
    )
}

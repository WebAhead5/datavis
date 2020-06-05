import React, { Fragment } from 'react'
import UserBar from '../UserBar/UserBar'
import RenderChart from './RenderChart'




export default function CreateChart({ setLoggedIn, name, setName, data, setData, cols, setCols }) {


    const [x, setX] = React.useState("")
    const [y, setY] = React.useState("")

    const chartVars = { x, y, setX, setY }

    const dataVars = { data, setData, cols, setCols }


    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />

            <RenderChart {...dataVars} {...chartVars} />


        </div>
    )
}

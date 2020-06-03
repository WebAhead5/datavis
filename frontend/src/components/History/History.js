import React from 'react'
import UserBar from '../UserBar/UserBar'

export default function History({ name, setName, setLoggedIn }) {
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">CHART<b> HISTORY</b></h1>
            <h3>display chart history</h3>
        </div>
    )
}
import React from 'react'
import UserBar from '../UserBar/UserBar'

export default function Tables({ name, setName, setLoggedIn }) {
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">TABLES</h1>
            <h3>display exisiting user tables here or in drop down</h3>
        </div>
    )
}

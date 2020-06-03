import React from 'react'
import UserBar from '../UserBar/UserBar'

export default function User({ name, setName, setLoggedIn }) {
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">USER <b>PAGE</b></h1>
            <div className="text-center mt-4">

            </div>
        </div>
    )
}

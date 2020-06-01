import React from 'react'
import UserBar from '../UserBar/UserBar'

export default function User({ name, setName, setLoggedIn }) {
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            <h1 className="text-center mt-5">USER PAGE</h1>
            <h3>display user info</h3>
        </div>
    )
}

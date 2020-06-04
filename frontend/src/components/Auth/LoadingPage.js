import React from 'react'
import UserBar from '../UserBar/UserBar'

export default function LoadingPage({ name, setName, setLoggedIn }) {
    return (
        <div>
            <UserBar name={name} setName={setName} setLoggedIn={setLoggedIn} />
            Loading
        </div>
    )
}

import React from 'react'

const PasswordAuth = ({password}) => {

    switch (password) {
        case password.length < 4:
            console.log('Password should contain at least 4 characters');
            
            break;
        case password.includes(!(/[0-9]/)):
            console.log('Password should contain at least 4 characters');

        break;
        case password.includes(!([/A-Z/])):
            console.log('Password should contain at least 4 characters');

    }
}

export default PasswordAuth
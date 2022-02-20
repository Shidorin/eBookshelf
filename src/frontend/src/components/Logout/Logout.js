import React from 'react'
import { Redirect } from 'react-router'

function Logout() {

    const redirect = () => {
        return <Redirect to="/home" />
    }
    const logout = () => {
        if (localStorage.getItem('username')) document.location.reload();
        localStorage.clear()

    }




    return (
        <>
            {logout()}
            {redirect()}
        </>
    )

}
export default Logout;
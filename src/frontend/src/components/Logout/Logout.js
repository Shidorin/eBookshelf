import React from 'react'
import { Redirect } from 'react-router'

class Logout extends React.Component {

    redirect() {
        return <Redirect to="/home" />
    }
    logout() {
        if (localStorage.getItem('username')) document.location.reload();
        localStorage.clear()

    }

    render() {
        this.logout()

        return (
            this.redirect()
        )
    }
}
export default Logout;
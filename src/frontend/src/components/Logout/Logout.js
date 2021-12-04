import React from 'react'
import { Redirect } from 'react-router'

class Logout extends React.Component {

    redirect() {
        return <Redirect to="/" />
    }
    logout() {
        localStorage.clear()
    }

    render() {
        this.logout()
        return (
            <Redirect to="/" />
        )
    }
}
export default Logout;
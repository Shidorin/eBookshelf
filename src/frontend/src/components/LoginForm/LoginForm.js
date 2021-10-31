import React from "react";
import './LoginForm.css'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'test',
            password: 'test',
        }
    }

    login() {
        var json = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        })
        fetch('http://localhost:8080/login', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })

    }


    render() {
        const changeUsername = (event) => this.setState({ username: event.target.value })
        const changePassword = (event) => this.setState({ password: event.target.value })
        return (
            <div className='loginForm'>
                <div><h1>Login</h1></div>
                <form>
                    <br />
                    <input type="text" id="loginForm" placeholder="Login" autoComplete="off" onChange={changeUsername}></input>
                    <br />
                    <br />
                    <br />
                    <input type="password" id="passwordForm" placeholder="Password" autoComplete="off" onChange={changePassword}></input>
                </form>
                <br />
                <br />
                <button onClick={() => { this.login() }}>Login</button>
            </div>
        )
    }
}

export default LoginForm
import React from "react";
import { Redirect } from "react-router";
import { authenticationService } from "../../services/auth_service";
import './LoginForm.css'
class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'test',
            password: 'test',
            redirect: false
        }
    }




    redirect() {
        if(localStorage.getItem('username')){
            return <Redirect to="/"/>
        }
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
                <button onClick={() => { authenticationService.login(this.state.username, this.state.password) }}>Login</button>
                {this.redirect()}
            </div>
        )
    }
}

export default LoginForm
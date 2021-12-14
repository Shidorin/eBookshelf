import React from "react";
import { Redirect } from "react-router-dom";
//import { authenticationService } from "../../services/auth_service";
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


    async Login(username, password) {
        var json = JSON.stringify({
            username: username,
            password: password,
        })
        console.log(json)
        await fetch('http://localhost:8080/login', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                this.props.history.replace('/home');
                document.location.reload();
                return true;
            })
            .catch((error) => {
                console.error('Error: ', error)
                return false
            });
        return false
    }



    redirect() {
        if (localStorage.getItem('username')) {
            return <Redirect to="/" />
        }
    }
    /**
     * get login and password values from text forms
     * on button click sends this values to login function
     */
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
                <button onClick={() => { this.Login(this.state.username, this.state.password)}}>Login</button>
            </div>
        )
    }
}

export default LoginForm
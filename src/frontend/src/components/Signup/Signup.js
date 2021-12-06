import React from "react";
import { Redirect } from "react-router-dom";
import './Signup.css'

class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'placeholderUsername',
            password: 'placeholderPassword',
            email: 'placeholderEmail',
            confirmPassword: 'placeholderConfirmPassowrd',
            redirect: false
        }
    }


    async RegisterFetch(username, email, password, confirmPassowrd) {
        if(password !== confirmPassowrd) { console.log('passwords mismatch'); return false}
        var json = JSON.stringify({
            username: username,
            password: password,
            email: email,
        })
        console.log(json)
        await fetch('http://localhost:8080/signup', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then(data => {
                //localStorage.setItem('token', data.token)
                //localStorage.setItem('username', data.username)
                //this.props.history.replace('/home');
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
        const changeEmail = (event) => this.setState({ email: event.target.value })
        const changePassword = (event) => this.setState({ password: event.target.value })
        const changeConfirmPassword = (event) => this.setState({ confirmPassword: event.target.value })
        return (
            <div className='registerForm'>
                <div><h1>Register</h1></div>
                <form>
                    <br />
                    <input type="text" id="loginForm" placeholder="Login" autoComplete="off" onChange={changeUsername}></input>
                    <br />
                    <br />
                    <br />
                    <input type="email" id="email" placeholder="Email" autoComplete="off" onChange={changeEmail}></input>
                    <br />
                    <br />
                    <br />
                    <input type="password" id="passwordForm" placeholder="Password" autoComplete="off" onChange={changePassword}></input>
                    <br />
                    <br />
                    <br />
                    <input type="password" id="passwordConfirmForm" placeholder="Confirm Password" autoComplete="off" onChange={changeConfirmPassword}></input>
                </form>
                <br />
                <br />
                <button onClick={() => { this.RegisterFetch(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)}}>Sign Up</button>
            </div>
        )
    }
}

export default Register
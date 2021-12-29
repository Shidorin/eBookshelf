import React from "react";
import { Redirect } from "react-router-dom";
import './Signup.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'placeholderUsername',
            password: 'placeholderPassword',
            email: 'placeholderEmail',
            confirmPassword: 'placeholderConfirmPassword',
            redirect: false
        }
    }


    async RegisterFetch(username, email, password, confirmPassowrd) {
        if (password !== confirmPassowrd) { console.log('passwords mismatch'); return false }
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

            <Container component="main" maxWidth="xs">
                <Box
                    component="form"

                    sx={{
                        backgroundColor: "#2B2D42",
                        color: '#bcbedc',
                        pt: "20px",
                        pb: "20px",
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography sx={{ pb: 2, color: "#bcbedc" }} component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <TextField
                        sx={{ input: { color: "#bcbedc" }, form: { autocomplete: "off", }, }}
                        margin="normal"
                        required
                        autoFocus
                        width="80%"
                        id="userNameTextField"
                        label="Username"
                        variant="outlined"
                        InputLabelProps={{ className: "textfield__label" }}
                        onChange={changeUsername}
                    />
                    <TextField
                        sx={{ input: { color: "#bcbedc" }, form: { autocomplete: "off", }, }}
                        margin="normal"
                        required
                        width="80%"
                        id="emailTextField"
                        label="Email"
                        variant="outlined"
                        InputLabelProps={{ className: "textfield__label" }}
                        onChange={changeEmail}
                    />
                    <TextField
                        sx={{ input: { color: "#bcbedc" }, form: { autocomplete: "off", }, }}
                        margin="normal"
                        required
                        type="password"
                        autoComplete="new-password"
                        id="passwordTextField"
                        label="Password"
                        variant="outlined"
                        InputLabelProps={{ className: "textfield__label" }}
                        onChange={changePassword}
                    />
                    <TextField
                        sx={{ input: { color: "#bcbedc" }, form: { autocomplete: "off", }, }}
                        margin="normal"
                        required
                        type="password"
                        autoComplete="new-password"
                        id="passwordConfirmTextField"
                        label="Confirm Password"
                        variant="outlined"
                        InputLabelProps={{ className: "textfield__label" }}
                        onChange={changeConfirmPassword}
                    />
                    <Button
                        sx={{ mt: 3, mb: 4 }}
                        variant="contained"
                        onClick={() => { this.RegisterFetch(this.state.username, this.state.email, this.state.password, this.state.confirmPassword) }}
                    >
                        Sign up
                    </Button>
                    <Grid item>
                        <Link href="/login" sx={{ pb: 5, color: '#bcbedc', textDecoration: "underline" }}>
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Box>
            </Container>

            //<div className='registerForm'>
            //    <div><h1>Register</h1></div>
            //    <form>
            //        <br />
            //        <input type="text" id="loginForm" placeholder="Login" autoComplete="off" onChange={changeUsername}></input>
            //        <br />
            //        <br />
            //        <br />
            //        <input type="email" id="email" placeholder="Email" autoComplete="off" onChange={changeEmail}></input>
            //        <br />
            //        <br />
            //        <br />
            //        <input type="password" id="passwordForm" placeholder="Password" autoComplete="off" onChange={changePassword}></input>
            //        <br />
            //        <br />
            //        <br />
            //        <input type="password" id="passwordConfirmForm" placeholder="Confirm Password" autoComplete="off" onChange={changeConfirmPassword}></input>
            //    </form>
            //    <br />
            //    <br />
            //    <button onClick={() => { this.RegisterFetch(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)}}>Sign Up</button>
            //</div>
        )
    }
}

export default Register
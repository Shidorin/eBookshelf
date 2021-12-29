import React from "react";
import { Redirect } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
                        Login
                    </Typography>
                    <TextField
                        sx={{ input: { color: "#bcbedc" } }}
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
                        sx={{ input: { color: "#bcbedc" } }}
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
                    <Button
                        sx={{ mt: 3, mb: 4 }}
                        variant="contained"
                        onClick={() => { this.Login(this.state.username, this.state.password) }}
                    >
                        Login
                    </Button>
                    <Grid item>
                        <Link href="/signup" sx={{ pb: 5, color: '#bcbedc', textDecoration: "underline" }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Box>
            </Container>
        )
    }
}

export default LoginForm
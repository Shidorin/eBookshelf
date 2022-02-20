import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './LoginForm.css'
import { BlueButton } from '../../styles/Style'

function LoginForm(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const changeUsername = (event) => setUsername(event.target.value);
    const changePassword = (event) => setPassword(event.target.value);

    const Login = async () => {
        var json = JSON.stringify({
            username: username,
            password: password,
        })
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
                props.history.replace('/home');
                document.location.reload();
                return true;
            })
            .catch((error) => {
                console.error('Error: ', error)
                return false
            });
        return false
    }

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
                <BlueButton
                    sx={{ mt: 3, mb: 4 }}
                    variant="contained"
                    onClick={() => { Login() }}
                >
                    Login
                </BlueButton>
                <Grid item>
                    <Link href="/signup" sx={{ pb: 5, color: '#bcbedc', textDecoration: "underline" }}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Box>
        </Container>
    )

}

export default LoginForm
import React, { useState } from "react";
import './Signup.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BlueButton } from '../../styles/Style'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

function Register(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [open, setOpen] = useState(false);

    const changeUsername = (event) => setUsername(event.target.value)
    const changePassword = (event) => setPassword(event.target.value)
    const changeEmail = (event) => setEmail(event.target.value)
    const changeConfirmPassword = (event) => setConfirmPassword(event.target.value)

    const RegisterFetch = async () => {
        if (
            password !== confirmPassword ||
            username === "" ||
            password === "" ||
            email === ""
        ) {
            setOpen(true)
            return false
        }
        let json = JSON.stringify({
            username: username,
            password: password,
            email: email,
        })
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
            })
            .catch((error) => {
                console.error('Error: ', error)
                return false
            });
        console.log("exit")
        props.history.replace('/home');
        document.location.reload();
        return false
    }


    /**
     * get login and password values from text forms
     * on button click sends this values to login function
     */
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
                    sx={{
                        input: { color: "#bcbedc", },
                        form: { autocomplete: "off", },
                        mb: 3,
                    }}
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

                {/* ERROR ALERT */}
                <Collapse in={open} sx={{ width: "70%" }} >
                    <Stack spacing={2}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            <AlertTitle>Error</AlertTitle>
                            Wrong input
                        </Alert>
                    </Stack>
                </Collapse>

                <BlueButton
                    sx={{ mt: 3, mb: 4 }}
                    variant="contained"
                    onClick={RegisterFetch}
                >
                    Sign up
                </BlueButton>
                <Grid item>
                    <Link href="/login" sx={{ pb: 5, color: '#bcbedc', textDecoration: "underline" }}>
                        {"Already have an account? Login"}
                    </Link>
                </Grid>
            </Box>
        </Container>

    )

}

export default Register
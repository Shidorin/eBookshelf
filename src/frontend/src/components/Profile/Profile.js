import React, { useState } from "react";
import '../../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TerminateButton, BlueButton } from '../../styles/Style'


function Profile(props) {

    const [username] = useState(localStorage.getItem('username'))
    const [newUsername, setNewUsername] = useState("")
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassoword, setConfirmNewPassoword] = useState("")
    const [password, setPassword] = useState("")

    const changeUsername = (event) => setNewUsername(event.target.value)
    const changeEmail = (event) => setEmail(event.target.value)
    const changeNewPassword = (event) => setNewPassword(event.target.value)
    const changeConfirmNewPassoword = (event) => setConfirmNewPassoword(event.target.value)
    const changePassword = (event) => setPassword(event.target.value)

    const confirmChanges = () => {
        //newUsername, email, newPassword, confirmNewPassoword, password

        console.log("newUsername:" + newUsername)
        console.log("email:" + email)
        console.log("newPassword:" + newPassword)
        console.log("confirmNewPassoword:" + confirmNewPassoword)
        console.log("password:" + password)

        if (newPassword !== confirmNewPassoword || newPassword === "" || newPassword === undefined) return;

        console.log("test")
    }

    const deleteUser = () => {
        console.log("delete")
        var json = JSON.stringify({
            username: username,
        })
        fetch('http://localhost:8080/profile/delete', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then(data => {
                localStorage.clear()
                props.history.replace('/home');
                return true;
            })
            .catch((error) => {
                console.error('Error: ', error)
                return false
            });
        return false
    }




    return (
        <div>

            <Box
                component="form"
                sx={{
                    width: '40%',
                    maxWidth: '70%',
                    backgroundColor: "#2B2D42",
                    top: "20%",
                    transform: 'translate(70%)',
                    px: "20px",
                    pb: "20px",
                    mt: 8,
                    color: '#bcbedc',
                }}
                noValidate
                autoComplete="off"
            >
                <h1>Welcome {username}</h1>
                <hr></hr>
                <h1>User Name</h1>
                <TextField
                    sx={{
                        input: {
                            color: "#bcbedc !important",
                            margin: "3px"
                        }
                    }}
                    fullWidth
                    id="userNameTextField"
                    label="User Name"
                    variant="outlined"
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={changeUsername}
                />
                <h1>Email</h1>
                <TextField
                    sx={{
                        input: {
                            color: "#bcbedc",
                        }
                    }}
                    fullWidth
                    id="emailTextField"
                    label="Email"
                    variant="outlined"
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={changeEmail}
                />
                <h1>Password</h1>
                <TextField
                    sx={{
                        mb: 3,
                        input: {
                            color: "#bcbedc",
                            padding: 2,
                        }
                    }}
                    type="password"
                    autoComplete="new-password"
                    fullWidth id="NewPasswordTextField"
                    label="New password"
                    variant="outlined"
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={changeNewPassword}
                />
                <TextField
                    sx={{
                        mb: 3,
                        input: {
                            color: "#bcbedc",
                            padding: 2,
                        },
                    }}
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                    id="ConfirmNewPasswordTextField"
                    label="Confirm new password"
                    variant="outlined"
                    InputLabelProps={{ className: "textfield__label" }}
                    onChange={changeConfirmNewPassoword}
                />
                <TextField
                    sx={{
                        mb: 3,
                        input:
                        {
                            color: "#bcbedc",
                            margin: "3px",
                            padding: 2,
                        }
                    }}
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                    id="PasswordTextField"
                    label="Confirm current password"
                    variant="outlined" InputLabelProps={{ className: "textfield__label" }}
                    onChange={changePassword}
                />
                <BlueButton
                    variant="contained"
                    onClick={() => { confirmChanges() }}
                >
                    Confirm
                </BlueButton>
                <p>{newPassword !== confirmNewPassoword ? "passwords don't match" : null}</p>
                <hr></hr>
                <h1>delete user account</h1>
                <TerminateButton
                    variant="contained"
                    onClick={() => { deleteUser() }}
                >
                    Terminate
                </TerminateButton>
            </Box>
        </div>
    )
}
export default Profile
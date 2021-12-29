import React from 'react'
import '../../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
}));



class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: localStorage.getItem('username'),
            newUsername: "",
            email: "",
            newPassword: "",
            confirmNewPassoword: "",
            password: "",
        }
    }

    /* pulling book data from database */
    //componentDidMount() {
    //    var url = new URL("http://localhost:8080/")
    //
    //    fetch(url, {
    //        credentials: 'include',
    //    })
    //        .then(response => response.json())
    //        .then((jsonData) => {
    //
    //        })
    //        .catch((error) => {
    //            console.error(error)
    //        })
    //}


    confirmChanges(newUsername, email, newPassword, confirmNewPassoword, password) {
        console.log("newUsername:" + newUsername)
        console.log("email:" + email)
        console.log("newPassword:" + newPassword)
        console.log("confirmNewPassoword:" + confirmNewPassoword)
        console.log("password:" + password)

        if (newPassword !== confirmNewPassoword || newPassword === "" || newPassword === undefined) return;

        console.log("test")
    }

    generate() {

    }

    render() {
        const changeUsername = (event) => this.setState({ newUsername: event.target.value })
        const changeEmail = (event) => this.setState({ email: event.target.value })
        const changeNewPassword = (event) => this.setState({ newPassword: event.target.value })
        const changeConfirmNewPassoword = (event) => this.setState({ confirmNewPassoword: event.target.value })
        const changePassword = (event) => this.setState({ password: event.target.value })
        return (
            <div>

                <Box
                    component="form"
                    sx={{
                        // '& > :not(style)': { m: 1, width: '25ch' },
                        width: '40%',
                        maxWidth: '70%',
                        backgroundColor: "#2B2D42",
                        top: "20%",
                        transform: 'translate(70%)',
                        px: "20px",
                        pb: "20px",
                        color: '#bcbedc',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h1>Welcome {this.state.username}</h1>
                    <hr></hr>
                    <h1>User Name</h1>
                    <TextField sx={{ input: { color: "#bcbedc", margin: "12px" } }} fullWidth id="userNameTextField" label="User Name" variant="outlined" InputLabelProps={{ className: "textfield__label" }} onChange={changeUsername} />
                    <br />
                    <h1>Email</h1>
                    <TextField sx={{ input: { color: "#bcbedc", margin: "12px" } }} fullWidth id="emailTextField" label="Email" variant="outlined" InputLabelProps={{ className: "textfield__label" }} onChange={changeEmail} />
                    <br />
                    <h1>Password</h1>
                    <TextField sx={{ input: { color: "#bcbedc", margin: "12px" } }} type="password" autoComplete="new-password" fullWidth id="NewPasswordTextField" label="New password" variant="outlined" InputLabelProps={{ className: "textfield__label" }} onChange={changeNewPassword} />
                    <br /><br /><br /><br />
                    <TextField sx={{ input: { color: "#bcbedc", margin: "12px" } }} type="password" autoComplete="new-password" fullWidth id="ConfirmNewPasswordTextField" label="Confirm new password" variant="outlined" InputLabelProps={{ className: "textfield__label" }} onChange={changeConfirmNewPassoword} />
                    <br /><br /><br /><br />
                    <TextField sx={{ input: { color: "#bcbedc", margin: "12px" } }} type="password" autoComplete="new-password" fullWidth id="PasswordTextField" label="Confirm current password" variant="outlined" InputLabelProps={{ className: "textfield__label" }} onChange={changePassword} />
                    <br /><br /><br /><br />
                    <Button variant="contained" onClick={() => { this.confirmChanges(this.state.newUsername, this.state.email, this.state.newPassword, this.state.confirmNewPassoword, this.state.password) }}>Confirm</Button>
                    <br />
                    <p>{this.state.newPassword !== this.state.confirmNewPassoword ? "passwords don't match" : null}</p>
                    <br /><br />
                    <hr></hr>
                    <br />
                    <h1>delete user account</h1>
                    <ColorButton variant="contained">Terminate</ColorButton>
                </Box>
            </div>
        )

    }
}
export default Profile
import LoginForm from "../components/LoginForm/LoginForm";



export const authenticationService = {
    login,
    logout,
};


async function login(username, password) {
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
            
            return true
        })
        .catch((error) => {
            console.error('Error: ', error)
            return false
        });
    return false
}

function logout() {
    
}
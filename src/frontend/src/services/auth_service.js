export const authenticationService = {
    Login,
    logout,
};

/**
 * login operation sends data to backend and saves to local storage token and username information
 * @param {*} username username from login form
 * @param {*} password password from password form
 * @returns false if login fails; true if succeeds
 */
//async function Login(username, password) {
//    var json = JSON.stringify({
//        username: username,
//        password: password,
//    })
//    console.log(json)
//    await fetch('http://localhost:8080/login', {
//        credentials: 'include',
//        method: "POST",
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: json,
//    })
//        .then(response => response.json())
//        .then(data => {
//            localStorage.setItem('token', data.token)
//            localStorage.setItem('username', data.username)
//            this.props.history.replace('/new/url');
//            return true;
//        })
//        .catch((error) => {
//            console.error('Error: ', error)
//            return false
//        });
//    return false
//}

function logout() {
    localStorage.clear()
}
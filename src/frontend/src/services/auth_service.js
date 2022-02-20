export const authenticationService = {
    Login,
    logout,
};

function logout() {
    localStorage.clear()
}
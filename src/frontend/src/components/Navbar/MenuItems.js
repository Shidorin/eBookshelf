export const MenuItems = [
    {
        title: 'Home',
        url: 'home',
        cName: 'nav-links'
    },
    {
        title: 'My Books',
        url: 'user/' + localStorage.getItem('username') + '/booklist',
        cName: 'nav-links'
    },
    {
        title: 'Book List',
        url: 'books',
        cName: 'nav-links'
    },
    {
        title: 'Profile',
        url: 'profile',
        cName: 'nav-links'
    },
    {
        title: 'Login',
        url: 'login',
        cName: 'nav-links'
    },
    {
        title: 'Sign up',
        url: 'signup',
        cName: 'nav-links'
    },
    {
        title: 'Log out',
        url: 'logout',
        cName: 'nav-links'
    }
]
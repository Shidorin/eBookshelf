import React from 'react'
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    state = { clicked: false }

    klik() {
        console.log("klik")
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (

            <nav className="NavbarItems">

                <h1 className="navbar-logo">
                    TEST
                </h1>

                {/* <div className="menu-icon" onClick={this.handleClick}>

                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

                </div> */}


                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {


                        MenuItems.filter((item) => {
                            if (localStorage.getItem('username')) {
                                if (item.title === 'Login') return false
                                if (item.title === 'Sign up') return false
                            }
                            else {  if (item.title === 'Log out') return false }
                            return true
                        }).map((item, index) => {


                            return (
                                <li key={index}>
                                    {<Link className={item.cName} to={'/' + item.url}>{item.title}</Link>}
                                    {/*<a className={item.cName} href={item.url} onClick={this.klik}>
                                </a>*/}
                                </li>
                            )
                        })}
                </ul>
            </nav>
        )
    }
}
export default Navbar;
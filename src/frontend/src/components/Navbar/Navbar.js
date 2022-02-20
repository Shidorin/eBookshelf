import React, { useState } from "react";
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import { Link, useHistory } from 'react-router-dom'

function Navbar() {

    const [clicked] = useState(false)

    const history = useHistory();

    const redirect = () => {
        history.push("/home");
    }

    return (

        <nav className="NavbarItems">

            <h1 className="navbar-logo" onClick={redirect} >
                eBookshelf
            </h1>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {


                    MenuItems.filter((item) => {
                        if (localStorage.getItem('username')) {
                            if (item.title === 'Login') return false
                            if (item.title === 'Sign up') return false

                        }
                        else {
                            if (item.title === 'Log out') return false
                            if (item.title === 'My Books') return false
                            if (item.title === 'Profile') return false
                        }
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
export default Navbar;
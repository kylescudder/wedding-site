import React, { Component } from 'react'
import Logo from './Logo'
import Links from './Links'
import Logout from './Logout'

class NavBar extends Component {
    render() {
        return (
            <div className="container-flex">
                <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Logo />
                    <Links />
                    <Logout />
                </div>
            </div>
        )
    }
}

export default NavBar
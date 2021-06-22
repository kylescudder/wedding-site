
import React, { Component } from 'react'
import logo from '../logo.svg'

class Logo extends Component {
    render() {
        return (
            <div className="navbar-brand" href="https://sambarros.com">
                <img src={logo} width="50" height="50" alt="sambarros.com" />
            </div>
        )
    }
}

export default Logo
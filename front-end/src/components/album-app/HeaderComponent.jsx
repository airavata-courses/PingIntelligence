import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo.JPG'
import {withRouter} from 'react-router'
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component{
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)

        return (
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href = "http://localhost:4200/" className = "navbar-brand">
                        <img className="img-responsive" src={logo} alt="logo" width="120" height="80"/>
                        </a>
                    </div>
                    <ul className = "navbar-nav">
                        {isUserLoggedIn && <li><Link className = "nav-link" to = "/welcome/user">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className = "nav-link" to = "/todos">Upload-N-Browse</Link></li>}
                        {isUserLoggedIn && <li><Link className = "nav-link" to = "/filter">Filter</Link></li>}
                    </ul>
                    <ul className = "navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className = "nav-link" to = "/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className = "nav-link" to = "/register">Register</Link></li>}
                        {isUserLoggedIn && <li><Link className = "nav-link" to = "/logout" onClick = {AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}


export default withRouter(HeaderComponent)
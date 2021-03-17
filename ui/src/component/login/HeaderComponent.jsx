import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../logo1.png'
import {withRouter} from 'react-router'
import AuthenticationService from './AuthenticationService.js'


class HeaderComponent extends Component{
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
		
        return (
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        {window.localStorage.getItem("username") !== null ?
                        <span style={{display:"flex",float:"right", backgroundColor:"white"}}><img src="https://img.icons8.com/officel/50/000000/change-user-male.png"/>Welcome {window.localStorage.getItem("username")}</span> : null}
                    
                    
                        <a href = "http://localhost:3000/dashboard" className = "navbar-brand">
                        <img style = {{height:"120px", width:"200px"}} className="img-responsive" src={logo} alt="logo" width="120" height="120"/>
                        </a>
                    </div>
                    <ul className = "navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className = "nav-link" to = "/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className = "nav-link" to = "/signup">Register</Link></li>}
                        {isUserLoggedIn && <li><Link className = "nav-link" to = "/login" onClick = {AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}


export default withRouter(HeaderComponent)
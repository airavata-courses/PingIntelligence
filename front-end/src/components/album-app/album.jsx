import React, { Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.js'
import LoginComponent from './LoginComponent'
import ListTodoComponent from './ListTodoComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from './WelcomeComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'
import ImageComponent from './ImageComponent'
import RegisterComponent from './RegisterComponent'
import FilterComponent from './FilterComponent'

class Album extends Component {
    render () {
        return (
                    <div className = "AlbumApp">
                        <Router>
                            <>
                                <HeaderComponent/>
                                <Switch>
                                <Route path ="/" exact component = {LoginComponent} />
                                <Route path ="/login" component = {LoginComponent} />
                                <Route path ="/register" component = {RegisterComponent} />                                
                                <AuthenticatedRoute path ="/welcome/:name" component = {WelcomeComponent} />
                                <AuthenticatedRoute path ="/todos/:id" component = {ImageComponent} />
                                <AuthenticatedRoute path ="/todos" component = {ListTodoComponent} />
                                <AuthenticatedRoute path ="/filter" component = {FilterComponent} />
                                <AuthenticatedRoute path ="/logout" component = {LogoutComponent} />                                
                                
                                <Route component = {ErrorComponent} />
                                </Switch>
                                <FooterComponent/>
                            </>
                        </Router>
                    </div>
                )
    }
}



export default Album;
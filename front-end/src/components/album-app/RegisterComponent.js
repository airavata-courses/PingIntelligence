import React, { Component} from 'react'
import { Link } from 'react-router-dom';

import AuthenticationService from './AuthenticationService.js'


class RegisterComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            username: 'user',
            password: '',
            hasRegisterFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }

    handleChange(event)
    {
        this.setState({[event.target.name]: event.target.value})
    }

    registerClicked()
    {           
        AuthenticationService
            .executeJwtAuthenticationService(`${this.state.username} register`, this.state.password)
            .then((response) => {
                this.setState({showSuccessMessage:true})
                this.setState({hasRegisterFailed:false})
                this.props.history.push(`/login`)
            }).catch( () =>{
                this.setState({showSuccessMessage:false})
                this.setState({hasRegisterFailed:true})
            })
    }

    render() {
        return (
                <div>
                    <h1> Login </h1>
                    <div className = "container">
                    {this.state.hasRegisterFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Registration Successful</div>}
                    User Name : <input type = "text" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
                    Password : <input type = "password" name = "password" value = {this.state.password} onChange = {this.handleChange}/>
                    <button className = "btn btn-success" onClick = {this.registerClicked}>Register</button>
                    </div>
                    <h5>Already registered?	<Link to="/login">Login Here</Link></h5>
                </div>
            )
    }
}


export default RegisterComponent
import React from "react";
import loginImg from "../../banner.jpg";
//import "./style.css"
import axios from 'axios';
import { Redirect } from "react-router-dom";
import AuthenticationService from './AuthenticationService.js'
import "../../bootstrap.css"


export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            loggedIn:false,
			hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
		
        console.log(this.state.username)
        var targetUrl = "http://localhost:3001/login";
        const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        }),
        };
        fetch(targetUrl, requestOptions)
        .then(async (res) => {
            this.setState({loggedIn : true})
            console.log("logged in" + this.state.loggedIn)
            const data = await res.json()
            console.log( data["pingintelligencetoken"]) 
            console.log( data["username"]) 
            // window.localStorage.setItem('username', data["username"]);
            // window.localStorage.setItem('photosquadtoken', data["photosquadtoken"]);
			
			AuthenticationService.registerSuccessfulLoginForJwt(data["username"],data["pingintelligencetoken"])
			// this.props.history.push(`/welcome/${this.state.username}`)
			
            if (this.state.loggedIn === true){
                this.props.history.push("/dashboard");
            }
            
        }).catch( () =>{
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
            })
		
		
		/*
		AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
				console.log(response)
				console.log(response.data.token)
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
                this.props.history.push(`/dashboard`)
            }).catch( () =>{
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
            })
		*/
		
    }

    handleLogin (ev) {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    handleRegister (ev) {
        this.props.history.push("/signup");
    }


    render(){
        return (
            <div className="base-container">
			
            <div className="content">
                <div className="image">
                    <img src={loginImg}></img>
                </div>
                <div className="form-group">
					<div>
					{this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    
                    <label className="username" htmlFor="username">Username</label>
                    <input className="username" type="text" name="username" placeholder="username" value={this.state.username}
                    onChange={this.handleLogin.bind(this)}
                    ></input>
                    </div>
                    <div>
                    <label className="username" htmlFor="password">Password</label>
                    <input className="username" type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleLogin.bind(this)}
                    ></input>
                    </div>
					<div>
						<button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Login</button>
                    </div>
                </div>
            </div>
            
        </div>
        )
        
    }

}

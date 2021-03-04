import React from "react";
import loginImg from "../../banner.jpg";
import "./style.css"
import axios from 'axios';
import { Redirect } from "react-router-dom";


export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            loggedIn:false
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
            console.log( data["photosquadtoken"]) 
            console.log( data["username"]) 
            // window.localStorage.setItem('username', data["username"]);
            window.localStorage.setItem('photosquadtoken', data["photosquadtoken"]);
            if (this.state.loggedIn === true){
                this.props.history.push("/dashboard");
            }
            
        })
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
                <div className="form">
                    <div className="form-group">
                    <label className="username" htmlFor="username">Username</label>
                    <input className="username" type="text" name="username" placeholder="username" value={this.state.username}
                    onChange={this.handleLogin.bind(this)}
                    ></input>
                    </div>
                    <div className="form-group">
                    <label className="username" htmlFor="password">Password</label>
                    <input className="username" type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleLogin.bind(this)}
                    ></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={this.handleSubmit.bind(this)}>
                    Login
                </button>
                <button type="button" className="btn" onClick={this.handleRegister.bind(this)}>
                    Register
                </button>

            </div>
        </div>
        )
        
    }

}

import React from "react";
import { Link } from "react-router-dom";
import loginImg from "../../login.svg";
//import "./style.css"
import "../../bootstrap.css"

export class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            firstname: "",
            lastname: "",
            emailID: "",
            registered:false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin (ev) {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }
    
    handleRegister(ev){
        var targetUrl = "http://localhost:3001/register";
        const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailID: this.state.emailID
        }),
        };
        fetch(targetUrl, requestOptions)
        .then(async (res) => {
            this.setState({registered : true})
            const data = await res.json()
            console.log( data["photosquadtoken"]) 
            console.log( data["isRegistered"]) 
            if(data["isRegistered"] === "201 CREATED")
                this.props.history.push("/dashboard");
            })
    }

    render(){
        return (
            <div className="base-container">
            <div className="content">
                <div className="image">
                    <img src={loginImg}></img>
                </div>
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="username" 
					value = {this.state.username}  onChange={this.handleLogin.bind(this)}></input>

                    <label  htmlFor="password">Password</label>
                    <input  type="password" name="password" placeholder="password" 
					value = {this.state.password}  onChange={this.handleLogin.bind(this)}></input>
                    
                    <label htmlFor="username">Firstname</label>
                    <input  type="text" name="firstname" placeholder="firstname" 
					value = {this.state.firstname}  onChange={this.handleLogin.bind(this)}></input>
                    
                    <label  htmlFor="username">Lastname</label>
                    <input type="text" name="lastname" placeholder="lastname" 
					value = {this.state.lastname}  onChange={this.handleLogin.bind(this)}></input>
                    
                    <label  htmlFor="username">Email</label>
                    <input  type="email" name="emailID" placeholder="emailID" 
					value = {this.state.emailID}  onChange={this.handleLogin.bind(this)}></input>
                    <button className="btn btn-success" style={{display:"flex", height:"50%", width:"20%", marginLeft:"40%"}} onClick={this.handleRegister.bind(this)}>Register</button>
						<div><Link className="link" to="/login">return to login page</Link></div>
                    </div>
					
					<div>
						
					</div>
            </div>
            
        </div>
        )
        
    }

}

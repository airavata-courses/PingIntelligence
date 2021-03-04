import React from "react";
import { Link } from "react-router-dom";
import loginImg from "../../login.svg";


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
                <div className="form">
                    <div className="form-group">
                    <label className="username" htmlFor="username">Username</label>
                    <input className="username" type="text" name="username" placeholder="username" onChange={this.handleLogin.bind(this)}></input>
                    </div>
                    <div className="form-group">
                    <label className="username" htmlFor="password">Password</label>
                    <input className="username" type="password" name="password" placeholder="password" onChange={this.handleLogin.bind(this)}></input>
                    </div>
                    <div className="form-group">
                    <label className="username" htmlFor="username">Firstname</label>
                    <input className="username" type="text" name="firstname" placeholder="firstname" onChange={this.handleLogin.bind(this)}></input>
                    </div>
                    <div className="form-group">
                    <label className="username" htmlFor="username">Lastname</label>
                    <input className="username" type="text" name="lastname" placeholder="lastname" onChange={this.handleLogin.bind(this)}></input>
                    </div>
                    <div className="form-group">
                    <label className="username" htmlFor="username">Email</label>
                    <input className="username" type="email" name="emailID" placeholder="emailID" onChange={this.handleLogin.bind(this)}></input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={this.handleRegister.bind(this)}>
                    Register
                </button>
                <div><Link className="link" to="/login">return to login page</Link></div>
                

            </div>
        </div>
        )
        
    }

}

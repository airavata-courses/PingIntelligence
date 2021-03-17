import React from "react";
import loginImg from "../../banner.jpg";
import "./style.css"
import axios from 'axios';
import { Redirect } from "react-router-dom";


export class Logout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        
        }
        
    }

    handleSubmit() {
        console.log(this.state.username)
        var targetUrl = "http://localhost:3001/logout";
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

    

    render(){
        return (
            <div >
           
                <button  type="button" className="btn" onClick={this.handleSubmit.bind(this)}>
                <img src="https://img.icons8.com/bubbles/50/000000/shutdown.png"/>
    
                </button>
          
            </div>
        )
        
    }

}

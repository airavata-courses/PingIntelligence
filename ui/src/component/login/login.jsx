import React from "react";
import loginImg from "../../banner.jpg";
// import "./style.css"
import AuthenticationService from './AuthenticationService.js'
import "../../bootstrap.css"
import socialMediaAuth from "./auth";
import {iuProvider, facebookProvider, googleProvider, githubProvider} from '../../config/authMethods';
import { FacebookLoginButton, MicrosoftLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";


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
            //console.log("logged in" + this.state.loggedIn)
            const data = await res.json()
            //console.log( data["photosquadtoken"]) 
            //console.log( data["username"]) 
            // window.localStorage.setItem('username', data["username"]);
            // window.localStorage.setItem('photosquadtoken', data["photosquadtoken"]);
			
			if(data["username"] === undefined)
			{
				this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
			}
			else
			{			
				AuthenticationService.registerSuccessfulLoginForJwt(data["username"],data["photosquadtoken"])
				// this.props.history.push(`/welcome/${this.state.username}`)
			
				if (this.state.loggedIn === true){
					this.props.history.push("/dashboard");
				}
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

        const handleOnClick = async (provider) => {
            await socialMediaAuth(provider).then((res) => {
                //console.log(res)
                var firstName = res.displayName.split(" ")[0]
                var lastName = res.displayName.split(" ")[1]
                var email = res.email
                var username = email
                
                console.log(firstName)
                console.log(lastName)
                console.log(email)
                console.log(username)
            }).catch((err) => {
                console.log("Failed Social Media Login")
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
            })
        }

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

                    <br/>
                    <table width="100%">
                        <tr>
                            <td><hr /></td>
                            <td style={{width: '1px', padding: '0 10px'}}>OR</td>
                            <td><hr /></td>
                        </tr>
                    </table>

                    <div class="col">
                        <MicrosoftLoginButton  onClick={() => handleOnClick(iuProvider)}>
                            <span><center>Login with IU</center></span>
                        </MicrosoftLoginButton >

                        <FacebookLoginButton onClick={() => handleOnClick(facebookProvider)}>
                            <span><center>Login with Facebook</center></span>
                        </FacebookLoginButton>

                        <GithubLoginButton  onClick={() => handleOnClick(githubProvider)}>
                            <span><center>Login with GitHub</center></span>
                        </GithubLoginButton >

                        <GoogleLoginButton  onClick={() => handleOnClick(googleProvider)}>
                            <span><center>Login with Google</center></span>
                        </GoogleLoginButton >
                    </div>

                </div>
            </div>
            
        </div>
        )
        
    }

}
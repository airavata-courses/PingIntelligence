import React from "react";
import loginImg from "../../banner.jpg";
// import "./style.css"
import AuthenticationService from "./AuthenticationService.js";
import "../../bootstrap.css";
import socialMediaAuth from "./auth";
import {
  iuProvider,
  facebookProvider,
  googleProvider,
  githubProvider,
} from "../../config/authMethods";
import {
  FacebookLoginButton,
  MicrosoftLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      hasLoginFailed: false,
      hasSocialMediaLoginFailed: false,
      showSuccessMessage: false,
      isSocialMediaLogin: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var targetUrl = "http://localhost:3001/login";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    fetch(targetUrl, requestOptions)
      .then(async (res) => {
        this.setState({ loggedIn: true });
        const data = await res.json();
        window.localStorage.setItem("username", data["username"]);
        window.localStorage.setItem("photosquadtoken", data["photosquadtoken"]);

        if (data["username"] === undefined) {
          this.setState({ showSuccessMessage: false });
          this.setState({ hasLoginFailed: true });
        } else {
          AuthenticationService.registerSuccessfulLoginForJwt(
            data["username"],
            data["photosquadtoken"]
          );

          if (this.state.loggedIn === true) {
            this.props.history.push("/dashboard");
          }
        }
      })
      .catch(() => {
        if (this.state.isSocialMediaLogin === true) {
          this.setState({ isSocialMediaLogin: false });
          this.setState({ hasSocialMediaLoginFailed: true });
          this.setState({ showSuccessMessage: false });
          this.setState({ hasLoginFailed: false });
        } else {
          this.setState({ hasSocialMediaLoginFailed: false });
          this.setState({ showSuccessMessage: false });
          this.setState({ hasLoginFailed: true });
        }
      });
  }

  handleLogin(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  handleRegister(ev) {
    this.props.history.push("/signup");
  }

  render() {
    const handleOnClick = async (provider) => {
      await socialMediaAuth(provider)
        .then((res) => {
          if (res.displayName == undefined) {
            var firstNameVar = "socialUserFName";
            var lastNameVar = "socialUserLName";
          } else {
            var firstNameVar = res.displayName.split(" ")[0];
            var lastNameVar = res.displayName.split(" ")[1];
          }

          var emailVar = res.email;
          var usernameVar = emailVar;
          var passwordVar = "$deFAult#paSSwrd*%";

          console.log("Trying registering user using Social Media details...");
          var targetUrl = "http://localhost:3001/register";
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username: usernameVar,
              password: passwordVar,
              firstname: firstNameVar,
              lastname: lastNameVar,
              emailID: emailVar,
            }),
          };
          fetch(targetUrl, requestOptions).then(async (res) => {
            this.setState({ registered: true });
            const data = await res.json();

            this.setState({ isSocialMediaLogin: true });
            this.setState({ username: usernameVar });
            this.setState({ password: passwordVar });
            console.log("Trying logging user using Social Media details...");
            this.handleSubmit();
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("Failed Social Media Login");
          this.setState({ showSuccessMessage: false });
          this.setState({ hasLoginFailed: true });
        });
    };

    return (
      <div className="base-container">
        <div className="content">
          <div className="image">
            <img src={loginImg}></img>
          </div>
          <div className="form-group">
            <div>
              {this.state.hasLoginFailed && (
                <div className="alert alert-danger">Invalid Credentials</div>
              )}
              {this.state.hasSocialMediaLoginFailed && (
                <div className="alert alert-warning">
                  Provided Email Id already registered using App Registration
                  Page. Please Sign In by entering below the username and
                  password.
                </div>
              )}
              {this.state.showSuccessMessage && (
                <div className="alert alert-success">Login Successful</div>
              )}

              <label className="username" htmlFor="username">
                Username
              </label>
              <input
                className="username"
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleLogin.bind(this)}
              ></input>
            </div>
            <div>
              <label className="username" htmlFor="password">
                Password
              </label>
              <input
                className="username"
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleLogin.bind(this)}
              ></input>
            </div>
            <div>
              <button
                className="btn btn-success"
                onClick={this.handleSubmit.bind(this)}
              >
                Login
              </button>
            </div>

            <div>
              <button className="btn">OR</button>
            </div>

            <br />
            {/* <table width="100%">
                        <tr>
                            <td><hr /></td>
                            <td style={{width: '1px', padding: '0 10px'}}>OR</td>
                            <td><hr /></td>
                        </tr>
                    </table> */}

            <div className="iu">
              <MicrosoftLoginButton onClick={() => handleOnClick(iuProvider)}>
                <span>
                  <center>Login with IU</center>
                </span>
              </MicrosoftLoginButton>

              {/*}
                        <FacebookLoginButton onClick={() => handleOnClick(facebookProvider)}>
                            <span><center>Login with Facebook</center></span>
                        </FacebookLoginButton>

                        <GithubLoginButton  onClick={() => handleOnClick(githubProvider)}>
                            <span><center>Login with GitHub</center></span>
                        </GithubLoginButton >

                        {*/}

              <GoogleLoginButton onClick={() => handleOnClick(googleProvider)}>
                <span>
                  <center>Login with Google</center>
                </span>
              </GoogleLoginButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

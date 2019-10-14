import React, { Component } from "react";
import "../styles/App.css";
import NavBar from "../components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";
import { BackgroundAdd } from "../components/Background";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      password_key: "",
      message: "",
      pwd1: "",
      pwd2: "",
      pwd2Error: "",
      pwd1Valid: false,
      pwd1VerifyBox: "box-disabled",
      pwdHasLowercase: false,
      pwdHasUppercase: false,
      pwdHasNumber: false,
      pwdHasMinLen: false,
      responseToPost: ""
    };
    this.Auth = new AuthService();
    this._isMounted = false;
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="row">
          <div className="col a12 m6" id="login-box">
            <div className="card-panel center">
              <i className="medium material-icons">lock</i>
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field col s12">
                    <i className="material-icons prefix input-icons">
                      lock_outline
                    </i>
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      value={this.state.pwd1}
                      onChange={e =>
                        this._isMounted &&
                        this.setState({ pwd1: e.target.value })
                      }
                      onKeyUp={this.handlePwdKeyUp}
                      onFocus={e =>
                        this._isMounted &&
                        this.setState({ pwd1VerifyBox: "box-enabled" })
                      }
                      onBlur={e =>
                        this._isMounted &&
                        this.setState({ pwd1VerifyBox: "box-disabled" })
                      }
                      required
                    />
                    <div
                      className={"password-message " + this.state.pwd1VerifyBox}
                    >
                      <h3 id="pwd1-verify-title">
                        Password must contain the following:
                      </h3>
                      <p
                        id="letter"
                        className={
                          this.state.pwdHasLowercase ? "valid" : "invalid"
                        }
                      >
                        A <b>lowercase</b> letter
                      </p>
                      <p
                        id="capital"
                        className={
                          this.state.pwdHasUppercase ? "valid" : "invalid"
                        }
                      >
                        A <b>capital (uppercase)</b> letter
                      </p>
                      <p
                        id="number"
                        className={
                          this.state.pwdHasNumber ? "valid" : "invalid"
                        }
                      >
                        A <b>number</b>
                      </p>
                      <p
                        id="length"
                        className={
                          this.state.pwdHasMinLen ? "valid" : "invalid"
                        }
                      >
                        Minimum <b>8 characters</b>
                      </p>
                    </div>
                    <label htmlFor="pwd-login">Password</label>
                  </div>
                  <div className="input-field col s12">
                    <i className="material-icons prefix input-icons">
                      lock_outline
                    </i>
                    <input
                      type="password"
                      name="rep-pwd"
                      id="rep-pwd-login"
                      value={this.state.pwd2}
                      onChange={e =>
                        this._isMounted &&
                        this.setState({ pwd2: e.target.value })
                      }
                      onKeyUp={this.handlePwdKeyUp}
                      required
                    />
                    <div className="register-error">{this.state.pwd2Error}</div>
                    <label htmlFor="rep-pwd-login">Repeat password</label>
                  </div>
                  <div id="error-back" />
                  <input
                    type="submit"
                    name="submit"
                    value="Save"
                    className="btn"
                    disabled={
                      !this.state.pwd1Valid ||
                      this.state.pwd2 !== this.state.pwd1
                    }
                  />
                </form>
                <p className="register-login-link">
                  Changed your mind?{" "}
                  <NavLink className="pink-link" to="/users/login">
                    Log in
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect user if already logged in
  componentDidMount() {
    this._isMounted = true;
    BackgroundAdd();
    if (this.Auth.loggedIn()) {
      ErrorToast.auth.userAlreadyLogged();
      this.props.history.replace("/");
    } else {
      this.callApi()
        .then(res => {
          var key = document.location.href;
          key = key.split("/");
          this._isMounted && this.setState({ status: res.message });
          this._isMounted &&
            this.setState({ password_key: key[key.length - 1] });
        })
        .catch(err => {
          console.log(err);
          this.props.history.replace("/users/login");
          ErrorToast.auth.invalidPwdResetKey();
        });
    }
  }

  callApi = async () => {
    var key = document.location.href;
    key = key.split("/");
    const response = await fetch(
      "/users/reset-password/" + key[key.length - 1]
    );
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // Checking password format is valid
  validatePwd = () => {
    if (/[a-z]/.test(this.state.pwd1)) {
      this._isMounted && this.setState({ pwdHasLowercase: true });
    } else {
      this._isMounted && this.setState({ pwdHasLowercase: false });
    }
    if (/[A-Z]/g.test(this.state.pwd1)) {
      this._isMounted && this.setState({ pwdHasUppercase: true });
    } else {
      this._isMounted && this.setState({ pwdHasUppercase: false });
    }
    if (/[0-9]/g.test(this.state.pwd1)) {
      this._isMounted && this.setState({ pwdHasNumber: true });
    } else {
      this._isMounted && this.setState({ pwdHasNumber: false });
    }
    if (this.state.pwd1.length >= 8 && this.state.pwd1.length <= 30) {
      this._isMounted && this.setState({ pwdHasMinLen: true });
    } else {
      this._isMounted && this.setState({ pwdHasMinLen: false });
    }
    if (
      this.state.pwdHasLowercase &&
      this.state.pwdHasUppercase &&
      this.state.pwdHasNumber &&
      this.state.pwdHasMinLen
    ) {
      this._isMounted && this.setState({ pwd1Valid: true });
    } else {
      this._isMounted && this.setState({ pwd1Valid: false });
    }
  };

  // Checking passwords match
  validateRepeatPwd = () => {
    if (this.state.pwd1 === this.state.pwd2) {
      this._isMounted && this.setState({ pwd2Error: "" });
    } else if (this.state.pwd2 !== "") {
      this._isMounted && this.setState({ pwd2Error: "Passwords don't match" });
    }
  };

  // Checking over both passwords on change
  handlePwdKeyUp = async e => {
    await this.validatePwd();
    await this.validateRepeatPwd();
  };

  // Submitting user data to backend
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/users/reset-password/:key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pwd1: this.state.pwd1,
        pwd2: this.state.pwd2,
        password_key: this.state.password_key
      })
    });

    const body = await response.text();
    if (response.ok) {
      this._isMounted && this.setState({ responseToPost: body });
      InfoToast.auth.changedPassword();
      this.props.history.push("/users/login");
    } else {
      let message = body.substr(10, body.length - 12);
      ErrorToast.custom.error(message, 1000);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default ResetPassword;

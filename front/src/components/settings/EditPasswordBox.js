import React, { Component } from "react";
import { Button, TextInput } from "react-materialize";
import ApiCall from "../../services/ApiCall";
import ErrorToast from "../../services/ErrorToastService";
import InfoToast from "../../services/InfoToastService";

class EditPasswordBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      currentPwd: "",
      pwd1: "",
      pwd2: "",
      currentPwdValid: false,
      pwd1Valid: false,
      pwd2Valid: false,
      currentPwdError: "",
      pwd2Error: "",
      currentPasswordConfirmed: false,
      editPasswordActive: false,
      pwd1VerifyBox: "box-disabled",
      pwdHasLowercase: false,
      pwdHasUppercase: false,
      pwdHasNumber: false,
      pwdHasMinLen: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        id: this.props.userId
      });
  }

  showEditPassword = () => {
    this._isMounted &&
      this.setState({
        editPasswordActive: true
      });
  };

  hideEditPassword = () => {
    this._isMounted &&
      this.setState({
        editPasswordActive: false,
        currentPasswordConfirmed: false,
        currentPwd: "",
        pwd1: "",
        pwd2: ""
      });
  };

  switchEditPassword = () => {
    if (this.state.editPasswordActive) this.hideEditPassword();
    else this.showEditPassword();
  };

  validateCurrentPwd = () => {
    if (
      this.state.currentPwd.length < 8 ||
      this.state.currentPwd.includes(" ")
    ) {
      this._isMounted &&
        this.setState({
          currentPwdError: "Please enter a valid password",
          currentPwdValid: false
        });
    } else if (this.state.currentPwd.length > 30) {
      this._isMounted &&
        this.setState({
          currentPwdError: "Password must be less or equal to 30 chars",
          currentPwdValid: false
        });
    } else {
      this._isMounted &&
        this.setState({
          currentPwdError: "",
          currentPwdValid: true
        });
    }
  };

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

  handleCurrentPasswordSubmit = async e => {
    e.preventDefault();

    await ApiCall.user
      .verifyPasswordWithId(this.state.id, this.state.currentPwd)
      .then(res => {
        this._isMounted &&
          this.setState({
            currentPasswordConfirmed: true
          });
      })
      .catch(err => {
        ErrorToast.custom.error(err.response.data.message, 1400);
      });
  };

  handlePasswordSubmit = async e => {
    e.preventDefault();

    await ApiCall.user
      .updatePasswordWithId(this.state.id, this.state.pwd1)
      .then(res => {
        InfoToast.custom.info("Password updated with success", 3000);
        this.hideEditPassword();
      })
      .catch(err => {
        ErrorToast.custom.error(err.response.data.message, 1400);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Button
          waves="light"
          style={{ marginLeft: "15px" }}
          onClick={this.switchEditPassword}
        >
          Modify password
        </Button>
        {this.state.editPasswordActive &&
          (this.state.currentPasswordConfirmed ? (
            <div className="edit-dropdown-background">
              <TextInput
                password={true}
                name="pwd"
                label="New password"
                id="pwd-login"
                value={this.state.pwd1}
                onChange={e =>
                  this._isMounted && this.setState({ pwd1: e.target.value })
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
                className={
                  "password-message edit-password-message " +
                  this.state.pwd1VerifyBox
                }
              >
                <h3 id="pwd1-verify-title">
                  Password must contain the following:
                </h3>
                <p
                  id="letter"
                  className={this.state.pwdHasLowercase ? "valid" : "invalid"}
                >
                  A <b>lowercase</b> letter
                </p>
                <p
                  id="capital"
                  className={this.state.pwdHasUppercase ? "valid" : "invalid"}
                >
                  A <b>capital (uppercase)</b> letter
                </p>
                <p
                  id="number"
                  className={this.state.pwdHasNumber ? "valid" : "invalid"}
                >
                  A <b>number</b>
                </p>
                <p
                  id="length"
                  className={this.state.pwdHasMinLen ? "valid" : "invalid"}
                >
                  Minimum <b>8 characters</b>
                </p>
              </div>
              <TextInput
                password={true}
                name="rep-pwd"
                label="Repeat new password"
                id="rep-pwd-login"
                value={this.state.pwd2}
                onChange={e =>
                  this._isMounted && this.setState({ pwd2: e.target.value })
                }
                onKeyUp={this.handlePwdKeyUp}
                required
              />
              <div className="general-input-error">{this.state.pwd2Error}</div>
              <Button
                className="edit-submit"
                onClick={this.handlePasswordSubmit}
                disabled={
                  !this.state.pwd1Valid ||
                  this.state.pwd2 !== this.state.pwd1 ||
                  this.state.pwd1 === "" ||
                  this.state.pwd2 === ""
                }
              >
                Confirm
              </Button>
            </div>
          ) : (
            <div className="edit-dropdown-background">
              <TextInput
                password={true}
                name="pwd"
                label="Enter current password to continue"
                id="pwd-login"
                value={this.state.currentPwd}
                onChange={e =>
                  this._isMounted &&
                  this.setState({ currentPwd: e.target.value })
                }
                onKeyUp={this.validateCurrentPwd}
                required
              />
              <div className="general-input-error">
                {this.state.currentPwdError}
              </div>
              <Button
                className="edit-submit"
                onClick={this.handleCurrentPasswordSubmit}
                disabled={
                  !this.state.currentPwdValid || this.state.currentPwd === ""
                }
              >
                Continue
              </Button>
            </div>
          ))}
      </div>
    );
  }
}

export default EditPasswordBox;

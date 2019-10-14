import React, { Component } from "react";
import AuthService from "../services/AuthService";

// HOC to wrap component and verify authentication
export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false,
      socket: ''
    };

    async componentDidMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/users/login");
      } else {
        try {
          const confirm = await Auth.getConfirm();
          //console.log("confirmation is:", confirm);
          this.setState({
            confirm: confirm,
            loaded: true
          });

        } catch (err) {
          console.log(err);
          Auth.logout();
          this.props.history.replace("/users/login");
        }
      }
    }

    componentWillUnmount() {
      if (this.state.socket)
        this.state.socket.close();
        //console.log('closing socket');
    }

    render() {
      if (this.state.loaded === true) {
        if (this.state.confirm) {
          //console.log("confirmed!");
          return (
            <AuthComponent
              history={this.props.history}
              confirm={this.state.confirm}
              //socket={this.state.socket}
            />
          );
        } else {
          console.log("not confirmed!");
          return null;
        }
      } else {
        return null;
      }
    }
  };
}

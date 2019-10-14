import React, { Component } from "react";
import "../containers/App";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";
import Axios from "axios";

class ConfirmAddr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  componentDidMount() {
    let key = document.location.href;
    key = key.split("/");
    Axios.get("/users/register/" + key[key.length - 1])
      .then(res => {
        Materialize.toast({
          html: res.data["message"],
          displayLength: 5000,
          classes: "rounded confirm-toast"
        });
        this.props.history.push("/");
      })
      .catch(err => {
        Materialize.toast({
          html: "An error has occurred",
          displayLength: 5000,
          classes: "rounded error-toast"
        });
        this.props.history.push("/");
      });
  }

  render() {
    return <div className="App" />;
  }
}

export default ConfirmAddr;

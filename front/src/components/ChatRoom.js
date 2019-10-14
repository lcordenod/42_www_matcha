import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import io from "socket.io-client";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      winSize: "",
      isRead: null,
      msg: "",
      toSend: "",
      listMessages: [],
      socket: "",
      userID: "",
      userName: "",
      userToken: this.Auth.getToken(),
      room_id: "",
      usernameOther: "",
      userID_other: ""
    };
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <div className="row main-chat-box" onMouseMove={this.handleMouseEvent}>
          <h5 id="chat-title">
            <NavLink
              className="message-link-profile"
              to={"/users/profile/" + this.state.usernameOther}
            >
              {this.state.usernameOther}
            </NavLink>
            's conversation
          </h5>
          <hr className="grey" />
          <div
            id="chatbox-message"
            className="col s12 chatbox-message"
            style={{ height: this.state.winSize }}
          >
            <br />
            <span className="valign-wrapper center-align">
              Say hi to your new match, {this.state.usernameOther}.
            </span>
            <br />
            <div>
              {this.state.listMessages.length > 0 && (
                <this.msgList value={this.state.listMessages} />
              )}
            </div>
          </div>
        </div>
        <form className="fixed-bottom-imput" onSubmit={this.handleSubmit}>
          <div className="col s9 chat-message-box">
            <label htmlFor="msgToSend">Write your message</label>
            <input
              type="text"
              id="msgToSend"
              name="msgToSend"
              autoComplete="off"
              value={this.state.toSend}
              onChange={this.handleChange}
              required
              autoFocus
            />
          </div>
          <div id="btn-chat-box" className="col s3 btn-chat-box">
            <button type="submit" name="submit" value="Send" className="btn">
              <i className="material-icons">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ winSize: window.innerHeight - 200 });
  }

  componentDidUpdate() {
    this._isMounted = true;
    if (this.state.listMessages !== this.props.listMessages)
      this.initializeComponent();
  }

  initializeComponent = async () => {
    if (this.state.socket) this.state.socket.close();
    this._isMounted &&
      (await this.setState({
        listMessages: this.props.listMessages,
        room_id: this.props.room_id,
        usernameOther: this.props.username,
        userID_other: this.props.userID_other
      }));

    this._isMounted &&
      (await this.setState({
        userID: this.Auth.getIdViaToken(this.state.userToken),
        userName: this.Auth.getUsernameViaToken(this.state.userToken)
      }));

    this._isMounted &&
      (await this.setState({
        socket: io("/chat", {
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            token: this.state.userToken,
            userID: this.state.userID,
            userName: this.state.userName,
            room_id: this.state.room_id
          }
        })
      }));

    this.state.socket.emit("readMessage", this.state.room_id);

    this.state.socket.on(this.state.room_id, data => {
      //console.log(data);
      var tab = this.state.listMessages;
      tab.push({
        id: this.state.listMessages.length + 1,
        value: data["data"],
        userID: data["userID"],
        date: ""
      });
      this._isMounted && this.setState({ listMessages: tab });
      //console.log(tab);
      this._isMounted && this.setState({ isRead: 1 });
      this.goToElement(tab.length);
    });
    //console.log(this.state.listMessages);
    if (this.state.listMessages.length < 1) return;
    this.goToElement(this.state.listMessages.length - 1);
  };

  handleResizeWindow = () => {
    this.setState({ winSize: window.innerHeight - 200 });
  };

  handleMouseEvent = () => {
    if (this.state.isRead !== null)
      this.state.socket.emit("readMessage", this.state.room_id);
  };

  goToElement = nb => {
    //console.log(nb);
    document.getElementById("id-msg" + nb).scrollIntoView({ block: "start" });
  };

  msgList = props => {
    // console.log(this.state.userID);
    const value = props.value;
    const listItems = value.map(e => (
      // eslint-disable-next-line
      <div
        className={
          // eslint-disable-next-line
          this.state.userID == e.userID ? "row right-align" : "row left-align"
        }
        key={e.id}
      >
        <div
          className={
            // eslint-disable-next-line
            this.state.userID == e.userID
              ? "col s12 m8 l6 right"
              : "col s12 m8 l6 left"
          }
        >
          <div className="row valign-wrapper">
            <div
              className={
                // eslint-disable-next-line
                this.state.userID == e.userID
                  ? "chat-field2 grey"
                  : "chat-field red"
              }
            >
              <span id={"id-msg" + e.id} className="chat-message white-text">
                {e.value}
              </span>
              <div
                id={"id-msg" + e.id}
                className={
                  // eslint-disable-next-line
                  this.state.userID == e.userID ? "example2" : "example"
                }
              />
            </div>
          </div>
        </div>
      </div>
    ));
    return <div className="col s12 m12 l9">{listItems}</div>;
  };

  handleChange = e => {
    this.setState({ toSend: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this._isMounted &&
      (await this.setState({ toSend: this.state.toSend.trim() }));
    if (this.state.toSend !== "") {
      var tab = this.state.listMessages;
      tab.push({
        id: this.state.listMessages.length + 1,
        value: this.state.toSend,
        userID: this.state.userID,
        date: ""
      });

      //console.log(this.state.room_id);
      this._isMounted && (await this.setState({ listMessages: tab }));
      this.goToElement(tab.length);
      this.state.socket.emit(
        this.state.room_id,
        this.state.toSend,
        this.state.userID_other
      );
    }
    this._isMounted && this.setState({ toSend: "" });
  };

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.socket) this.state.socket.close();
  }
}

export default Chat;

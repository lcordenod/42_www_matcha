import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import Axios from "axios";
import withAuth from "./withAuth";
import ChatConv from "./ChatConv";
import ChatRoom from "./ChatRoom";
import NavBar from "./NavBar";

const CancelToken = Axios.CancelToken;
// eslint-disable-next-line
let cancel;

class Messages extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      room: null,
      username: "",
      userID: "",
      listMessages: []
    };
    this.handleRoomData = this.handleRoomData.bind(this);
    this._isMounted = false;
  }

  async handleRoomData(room_id, username, userID) {
    (await this._isMounted) &&
      this.setState({
        room: room_id,
        username: username,
        userID: userID
      });
    this.updateChat();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="row left align" style={{ minWidth: 100 + "%" }}>
          <div className="col s3" style={{ height: this.state.winSize }}>
            <ChatConv roomToParent={this.handleRoomData} />
          </div>
          <div className="col s9">
            {this.state.room === null && (
              <div
                className="valign-wrapper center-align empty-box"
                style={{
                  paddingTop: 30 + "%",
                  backgroundColor: "#a9a9a9",
                  marginTop: 1 + "%",
                  height: window.innerHeight - 100
                }}
              >
                {this.state.listMessages.length < 1 && (
                  <h5>Select a conversation.</h5>
                )}
              </div>
            )}
            {this.state.room !== null && (
              <ChatRoom
                room_id={this.state.room}
                listMessages={this.state.listMessages}
                username={this.state.username}
                userID_other={this.state.userID}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this._isMounted = true;

    if (this.state.room === null) return;
    await Axios.get("/chat/room/" + this.state.room, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        const tab = [];
        for (var i = 0; i < res.data.result.length; i++)
          tab.push({
            id: i,
            value: res.data.result[i]["content"],
            userID: res.data.result[i]["user_id"],
            date: res.data.result[i]["date"]
          });
        this._isMounted && this.setState({ listMessages: tab });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateChat = async () => {
    await Axios.get("/chat/room/" + this.state.room, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        const tab = [];
        for (var i = 0; i < res.data.result.length; i++)
          tab.push({
            id: i,
            value: res.data.result[i]["content"],
            userID: res.data.result[i]["user_id"],
            date: res.data.result[i]["date"]
          });
        this._isMounted && this.setState({ listMessages: tab });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default withAuth(Messages);

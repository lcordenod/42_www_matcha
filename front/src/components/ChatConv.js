import React, { Component } from "react";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import io from "socket.io-client";
import AuthService from "../services/AuthService";
import Axios from "axios";
import Avatar from "@material-ui/core/Avatar";

const CancelToken = Axios.CancelToken;
// eslint-disable-next-line
let cancel;

class ChatConv extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      winSize: "",
      userID: this.Auth.getConfirm()["id"],
      status: 0,
      socket: "",
      matches: [],
      displayChatbox: this.displayChatbox.bind(this)
    };
    this._isMounted = false;
  }

  render() {
    return (
      <ul className="collection with-header chatBox">
        <li className="collection-header">
          <h5 style={{ textAlign: "center" }} className="chat-conv-title-text">
            Chats
          </h5>
          <i className="material-icons prefix pink-icon chat-conv-title-icon">
            mail
          </i>
        </li>
        <this.contactList value={this.state.matches} />
      </ul>
    );
  }

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ winSize: window.innerHeight - 160 });
    await Axios.get("/chat/matches/" + this.Auth.getToken(), {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        const tab = [];
        for (var i = 0; i < res.data["result"].length; i++)
          tab.push({
            id: i,
            userID:
              res.data["result"][i]["user_1"] === this.state.userID
                ? res.data["result"][i]["user_2"]
                : res.data["result"][i]["user_1"],
            username:
              res.data["result"][i]["user_1"] === this.state.userID
                ? res.data["result"][i]["username_2"]
                : res.data["result"][i]["username_1"],
            room_id: res.data["result"][i]["room_id"],
            status: ""
          });
        i = 0;

        while (i < res.data["status"].length) {
          var k = 0;
          while (k < tab.length) {
            if (tab[k]["userID"] === res.data["status"][i]["id"]) {
              tab[k]["status"] =
                res.data["status"][i]["online"] === 1 ? "Online" : "Offline";
            }
            k++;
          }
          i++;
        }

        i = 0;
        while (i < res.data["profile_pic"].length) {
          var j = 0;
          while (j < tab.length) {
            if (tab[j]["userID"] === res.data["profile_pic"][i]["user_id"]) {
              tab[j]["profile_pic"] = res.data["profile_pic"][i]["url"];
            }
            j++;
          }
          i++;
        }
        this._isMounted && this.setState({ matches: tab });
      })
      .catch(err => {
        //console.log(err);
      });

    (await this._isMounted) &&
      this.setState({
        socket: io({
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            userID: this.state.userID,
            matches: this.state.matches
          }
        })
      });

    if (this.state.socket) {
      this.state.socket.on("online", data => {
        var tab = this.state.matches;
        for (var i = 0; i < tab.length; i++) {
          //eslint-disable-next-line
          if (tab[i]["userID"] == data["user_id"]) tab[i]["status"] = "Online";
        }
        this._isMounted && this.setState({ matches: tab });
      });

      this.state.socket.on("offline", data => {
        var tab = this.state.matches;
        for (var i = 0; i < tab.length; i++) {
          // eslint-disable-next-line
          if (tab[i]["userID"] == data["user_id"]) tab[i]["status"] = "Offline";
        }
        this._isMounted && this.setState({ matches: tab });
      });

      this.state.socket.on("new message", data => {
        // eslint-disable-next-line
        if (data["userID_other"] != this.state.userID) return;
        var elem;
        for (var i = 0; i < this.state.matches.length; i++) {
          // eslint-disable-next-line
          if (this.state.matches[i]["room_id"] == data["room_id"]) {
            elem = document.getElementById(
              "contactList-" + this.state.matches[i]["room_id"]
            );
            break;
          }
        }
        this.sortContactList(data["room_id"]);
        elem.style = "background-color: #ffcdd2;";
      });

      this.callNotifApi();

      this.state.socket.on("readMessage", (data, roomID) => {
        // eslint-disable-next-line
        if (data != this.state.userID) return;
        document
          .getElementById("contactList-" + roomID)
          .removeAttribute("style");
      });
    }
  }

  contactList = props => {
    const value = props.value;
    const contacts = value.map(e => (
      <li
        className="collection-item avatar clickable"
        key={e.id}
        id={"contactList-" + e.room_id}
        onClick={() => this.displayChatbox(e.room_id, e.username, e.userID)}
      >
        {e.profile_pic === undefined ? (
          <Avatar className="chat-user-letters">
            {e.username[0] + e.username[1]}
          </Avatar>
        ) : (
          /* <i className="material-icons circle pink">person_pin</i> */
          <Avatar
            alt={e.username}
            src={e.profile_pic}
            className="chat-user-avatar"
          />
        )}
        <span className="title truncate chat-user-title">{e.username}</span>
        <p className="chat-user-status">{e.status}</p>
        <a href="#!" className="secondary-content">
          <span
            id={e.status === "Online" ? "green-circle" : "grey-circle"}
            aria-label="Active Now"
          />
        </a>
      </li>
    ));
    return (
      <ul style={{ height: this.state.winSize, overflow: "auto" }}>
        {contacts}
      </ul>
    );
  };

  componentWillUnmount() {
    if (this.state.socket !== "") this.state.socket.close();
    this._isMounted = false;
  }

  sortContactList = roomID => {
    var copy;
    var index;
    for (var i = 0; i < this.state.matches.length; i++) {
      // eslint-disable-next-line
      if (this.state.matches[i]["room_id"] == roomID) {
        copy = this.state.matches[i];
        index = i;
      }
    }
    var tab = this.state.matches;
    tab.splice(index, 1);
    tab.splice(0, 0, copy);
    this._isMounted && this.setState({ matches: tab });
  };

  displayChatbox = (roomId, username, userID) => {
    this.props.roomToParent(roomId, username, userID);
    document.getElementById("contactList-" + roomId).removeAttribute("style");
  };

  callNotifApi = async () => {
    await Axios.get("/chat/notification/list/" + this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        var tab = res.data["notification"];
        for (var i = 0; i < tab.length; i++) {
          document.getElementById("contactList-" + tab[i]["reference"]).style =
            "background-color: #ffcdd2;";
        }
      })
      .catch(err => {
        //console.log(err);
      });
  };
}

export default ChatConv;

import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import NavBar from "../components/NavBar";
import {
  ProfileSettingsButton,
  ProfileActionsButton,
  LikeButton,
  LikeBackButton,
  DislikeButton
} from "../components/Buttons";
import ModalUserEditProfileInfo from "../components/modals/ModalUserEditProfileInfo";
import ModalUserEditProfilePictures from "../components/modals/ModalUserEditProfilePictures";
import ModalUserEditAccountSettings from "../components/modals/ModalUserEditAccountSettings";
import ModalReportUser from "../components/modals/ModalReportUser";
import ModalMatchAnim from "../components/modals/ModalMatchAnim";
import ModalBlockUser from "../components/modals/ModalBlockUser";
import ModalUnblockUser from "../components/modals/ModalUnblockUser";
import ModalUserSupervise from "../components/modals/ModalUserSupervise";
import ApiCall from "../services/ApiCall";
import UserBio from "../components/profile/UserBio";
import Interests from "../components/profile/Interests";
import Preferences from "../components/profile/Preferences";
import Pictures from "../components/profile/Pictures";
import Popscore from "../components/profile/Popscore";
import moment from "moment";
import ErrorToast from "../services/ErrorToastService";
import defaultProfileNoGender from "../assets/default-profile-no-gender.png";
import defaultProfileMan from "../assets/default-profile-man.jpg";
import defaultProfileWoman from "../assets/default-profile-woman.jpg";
import ProfileBackgroundMan from "../assets/man-profile-background.png";
import ProfileBackgroundWoman from "../assets/woman-profile-background.png";
import ProfileBackgroundManWoman from "../assets/man-woman-profile-background.png";
import Logo from "../assets/logo.png";
import Male from "../assets/male.png";
import Female from "../assets/female.png";
import io from "socket.io-client";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      user: [],
      profile_picture: [],
      pictures: [],
      tags: [],
      socket: "",
      likedByProfile: false,
      likesProfile: false,
      isOpen: false,
      isReported: false,
      isBlocked: false
    };
    this.setData = this.setData.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleLikeBack = this.handleLikeBack.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this._isMounted = false;
  }

  render() {
    var profilePicStyle = {
      backgroundImage: `url(${
        this.state.profile_picture.length !== 0
          ? this.state.profile_picture[0].url
          : this.state.user.gender === null
          ? defaultProfileNoGender
          : this.state.user.gender === "man"
          ? defaultProfileMan
          : defaultProfileWoman
      })`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover"
    };

    if (!this.state.user.id) return null;
    return (
      <div className="App">
        <NavBar />
        <div className="row">
          <div className="col l12 m12 s12">
            <div className="row">
              <div className="col s12">
                <div className="card">
                  <div className="card-image">
                    <img
                      className="profile-background-image"
                      src={
                        this.state.user.sexual_orientation === "bi"
                          ? ProfileBackgroundManWoman
                          : (this.state.user.sexual_orientation === "hetero" &&
                              this.state.user.gender === "man") ||
                            (this.state.user.sexual_orientation === "homo" &&
                              this.state.user.gender === "woman")
                          ? ProfileBackgroundWoman
                          : ProfileBackgroundMan
                      }
                      alt=""
                    />
                  </div>
                  <div className="card-content">
                    <div className="row">
                      {this.props.userConnectedData.id !== undefined &&
                        this.props.userConnectedData.username !==
                          this.state.user.username &&
                        this.state.pictures.length !== 0 &&
                        this.props.userConnectedData.pictures.length !== 0 &&
                        this.state.isBlocked !== true &&
                        (this.state.likesProfile === true ? (
                          <div
                            className="profile-dislike"
                            onClick={e => this.handleDislike()}
                          >
                            <DislikeButton />
                          </div>
                        ) : this.state.likedByProfile === true ? (
                          <div
                            className="profile-like-back"
                            onClick={e => this.handleLikeBack()}
                          >
                            <LikeBackButton />
                          </div>
                        ) : (
                          <div
                            className="profile-like"
                            onClick={e => this.handleLike()}
                          >
                            <LikeButton />
                          </div>
                        ))}
                      {this.state.likedByProfile === true &&
                        this.state.likesProfile === true &&
                        this.state.user.username !==
                          this.props.userConnectedData.username && (
                          <img
                            className="profile-match-icon"
                            src={Logo}
                            alt="Match icon"
                          />
                        )}
                      <div className="profile-popscore">
                        <Popscore popscore={this.state.user.pop_score} />
                      </div>
                      <div className="col s4 profile-pic">
                        <div
                          className="circle responsive-img profile-picture-round"
                          style={profilePicStyle}
                        />
                      </div>
                      <div className="profile-details-container">
                        <div className="profile-details">
                          <span className="profile-username">
                            {this.state.user.username}{" "}
                            <span className="profile-status">
                              {this.state.user.online ||
                              this.state.user.username ===
                                this.props.userConnectedData.username ? (
                                <i className="material-icons dp48 online-icon">
                                  fiber_manual_record
                                </i>
                              ) : (
                                <span className="tooltip">
                                  <i className="material-icons dp48 offline-icon">
                                    fiber_manual_record
                                  </i>{" "}
                                  <span className="tooltip-text">
                                    {this.state.user.last_connexion
                                      ? moment(
                                          this.state.user.last_connexion
                                        ).fromNow()
                                      : "never seen online"}
                                  </span>
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="profile-two-names">
                            {this.state.user.firstname}{" "}
                            {this.state.user.lastname}{" "}
                            {this.state.user.gender === null ? (
                              <span className="grey-message">
                                (Gender not set)
                              </span>
                            ) : this.state.user.gender === "man" ? (
                              <img
                                src={Male}
                                alt="male icon"
                                className="profile-gender-icon"
                              />
                            ) : (
                              <img
                                src={Female}
                                alt="female icon"
                                className="profile-gender-icon"
                              />
                            )}
                          </span>
                          <span className="profile-location">
                            <i className="material-icons prefix pink-icon">
                              place
                            </i>{" "}
                            <span className="profile-text-icon">
                              {this.state.user.city === null ? (
                                <span className="grey-message">
                                  No location yet
                                </span>
                              ) : (
                                this.state.user.city
                              )}
                            </span>
                          </span>{" "}
                          <span className="profile-birthdate">
                            <i className="material-icons prefix pink-icon">
                              cake
                            </i>{" "}
                            <span className="profile-text-icon">
                              {this.state.user.birthdate === null ? (
                                <span className="grey-message">
                                  No birthdate yet
                                </span>
                              ) : (
                                moment().diff(
                                  this.state.user.birthdate,
                                  "years",
                                  false
                                ) + " years old"
                              )}
                            </span>
                          </span>{" "}
                        </div>
                      </div>
                      <div className="col right controls ">
                        {this.state.user.id ===
                        this.props.userConnectedData.id ? (
                          <ProfileSettingsButton />
                        ) : (
                          <ProfileActionsButton
                            isReported={this.state.isReported}
                            isBlocked={this.state.isBlocked}
                          />
                        )}
                      </div>
                    </div>
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditProfileInfo />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditProfilePictures />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserEditAccountSettings />
                    )}
                    {this.state.user.id === this.props.userConnectedData.id && (
                      <ModalUserSupervise
                        user_id={this.props.userConnectedData.id}
                      />
                    )}
                    {this.state.user.id !== this.props.userConnectedData.id && (
                      <ModalReportUser
                        user_id={this.Auth.getConfirm()["id"]}
                        target_id={this.state.user.id}
                        isReported={this.handleIsReported}
                      />
                    )}
                    {this.state.user.id !== this.props.userConnectedData.id && (
                      <ModalBlockUser
                        user_id={this.Auth.getConfirm()["id"]}
                        target_id={this.state.user.id}
                        isBlocked={this.handleIsBlocked}
                      />
                    )}
                    {this.state.user.id !== this.props.userConnectedData.id && (
                      <ModalUnblockUser
                        user_id={this.Auth.getConfirm()["id"]}
                        target_id={this.state.user.id}
                        isBlocked={this.handleIsBlocked}
                      />
                    )}
                    {this.state.user.id !== this.props.userConnectedData.id && (
                      <ModalMatchAnim />
                    )}
                  </div>
                </div>
                <UserBio bio={this.state.user.bio} />
                <Preferences user={this.state.user} />
                <Interests tags={this.state.tags} />
                {this.state.pictures !== undefined && (
                  <Pictures pictures={this.state.pictures} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    this._isMounted = true;
    if (!this.Auth.loggedIn()) {
      ErrorToast.auth.pageRequiresLogin();
      this.props.history.replace("/users/login");
      return;
    }
    let url = document.location.href;
    let username = url.split("/");
    username = username[username.length - 1];

    if (this.props.userConnectedData.username !== username) {
      (await this._isMounted) &&
        this.setState({
          socket: io({
            transports: ["polling"],
            requestTimeout: 50000,
            upgrade: false,
            "sync disconnect on unload": true,
            query: {
              userID: this.Auth.getConfirm()["id"]
            }
          })
        });

      if (this.state.socket) {
        this.state.socket.on("newNotif", id => {
          if (id === this.Auth.getConfirm()["id"]) this.setData(username);
        });
        this.state.socket.on("online", data => {
          // eslint-disable-next-line
          if (data["user_id"] == this.state.user.id) this.setData(username);
        });
        this.state.socket.on("offline", data => {
          // eslint-disable-next-line
          if (data["user_id"] == this.state.user.id) this.setData(username);
        });
      }

      this.setData(username);
    } else {
      if (this.props.userConnectedData.pictures.length !== 0) {
        var profile_pic = this.props.userConnectedData.pictures.filter(pic => {
          return pic.profile_picture === 1;
        });
      }

      this._isMounted &&
        this.setState({
          user: this.props.userConnectedData,
          profile_picture:
            this.props.userConnectedData.pictures.length === 0
              ? []
              : profile_pic,
          pictures: this.props.userConnectedData.pictures,
          tags: this.props.userConnectedData.tags
        });
    }
  }

  async componentDidUpdate() {
    this._isMounted = true;
    let url = document.location.href;
    let username = url.split("/");
    username = username[username.length - 1];

    if (this.props.userConnectedData.username !== username) {
      if (
        username !== this.state.user.username &&
        this.state.user.username !== undefined
      ) {
        this.setData(username);
      }
    } else if (
      this.state.user !== this.props.userConnectedData ||
      this.state.pictures !== this.props.userConnectedData.pictures ||
      this.state.tags !== this.props.userConnectedData.tags
    ) {
      if (this.props.userConnectedData.pictures.length !== 0) {
        var profile_pic = this.props.userConnectedData.pictures.filter(pic => {
          return pic.profile_picture === 1;
        });
      }

      this._isMounted &&
        this.setState({
          user: this.props.userConnectedData,
          profile_picture:
            this.props.userConnectedData.pictures.length === 0
              ? []
              : profile_pic,
          pictures: this.props.userConnectedData.pictures,
          tags: this.props.userConnectedData.tags
        });
    }
  }

  async setData(username) {
    await ApiCall.user
      .getUserFromUsername(username)
      .then(res => {
        if (res.pictures.length !== 0) {
          var profile_picture = res.pictures.filter(pic => {
            return pic.profile_picture === 1;
          });
        }

        this._isMounted &&
          this.setState({
            user: res.data,
            profile_picture: res.pictures.length === 0 ? [] : profile_picture,
            pictures: res.pictures,
            tags: res.tags
          });

        ApiCall.user
          .checkUserLikedByAndReverse(this.Auth.getConfirm()["id"], username)
          .then(res => {
            this._isMounted &&
              this.setState({
                likedByProfile: res.likedBy,
                likesProfile: res.reverse
              });
          })
          .catch(err => {
            console.log(err);
          });

        ApiCall.user
          .checkUserIsReported(this.Auth.getConfirm()["id"], this.state.user.id)
          .then(res => {
            this._isMounted &&
              this.setState({
                isReported: res.isReported
              });
          });

        ApiCall.user
          .checkUserIsBlocked(this.Auth.getConfirm()["id"], this.state.user.id)
          .then(res => {
            this._isMounted &&
              this.setState({
                isBlocked: res.isBlocked
              });
          });
      })
      .catch(err => {
        ErrorToast.user.userNotFound();
        this.props.history.replace("/");
        console.log(err);
      });
    if (this.state.socket !== "")
      this.state.socket.emit(
        "sendNotif",
        "visit",
        this.Auth.getConfirm()["id"],
        this.state.user["id"]
      );
  }

  handleIsReported = () => {
    ApiCall.user
      .checkUserIsReported(this.Auth.getConfirm()["id"], this.state.user.id)
      .then(res => {
        this._isMounted &&
          this.setState({
            isReported: res.isReported
          });
      });
  };

  handleIsBlocked = async () => {
    await ApiCall.user
      .checkUserIsBlocked(this.Auth.getConfirm()["id"], this.state.user.id)
      .then(res => {
        this._isMounted &&
          this.setState({
            isBlocked: res.isBlocked
          });
      });
  };

  handleLike() {
    ApiCall.user.createUserLike(
      this.state.user.id,
      this.Auth.getConfirm()["id"]
    );

    this._isMounted &&
      this.setState({
        likesProfile: true
      });

    if (this.state.socket !== "") {
      this.state.socket.emit(
        "sendNotif",
        "like",
        this.Auth.getConfirm()["id"],
        this.state.user["id"]
      );
    }
  }

  handleLikeBack() {
    ApiCall.user.createUserLike(
      this.state.user.id,
      this.Auth.getConfirm()["id"]
    );

    this._isMounted &&
      this.setState({
        likesProfile: true
      });

    if (this.state.socket !== "") {
      this.state.socket.emit(
        "sendNotif",
        "like_back",
        this.Auth.getConfirm()["id"],
        this.state.user["id"]
      );
    }
  }

  handleDislike() {
    ApiCall.user.deleteUserLike(
      this.state.user.id,
      this.Auth.getConfirm()["id"]
    );

    this._isMounted &&
      this.setState({
        likesProfile: false
      });

    if (this.state.socket !== "") {
      this.state.socket.emit(
        "sendNotif",
        "dislike",
        this.Auth.getConfirm()["id"],
        this.state.user["id"]
      );
    }
  }

  componentWillUnmount() {
    if (this.state.socket !== "") this.state.socket.close();
    this._isMounted = false;
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(UserProfile);

import React, { Component } from "react";
import Popscore from "../profile/Popscore";
import { LikeButton, DislikeButton, LikeBackButton } from "../Buttons";
import Male from "../../assets/male.png";
import Female from "../../assets/female.png";
import InterestTagsOnly from "../profile/InterestTagsOnly";
import moment from "moment";
import { NavLink } from "react-router-dom";
import ApiCall from "../../services/ApiCall";
import ManPicture from "../../assets/default-profile-man.jpg";
import WomanPicture from "../../assets/default-profile-woman.jpg";
import NoGender from "../../assets/default-profile-no-gender.png";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        "none",
        "pizza",
        "animals",
        "party",
        "travel",
        "sport",
        "cooking",
        "technology",
        "art",
        "culture",
        "books",
        "money",
        "politics",
        "nature",
        "clothing",
        "fashion",
        "music"
      ],
      age: "",
      picture: "",
      taggs: [],
      copyTags: "",
      likesProfile: false,
      likedByProfile: false
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    var tab = [];
    await this.props.intel.tags.forEach(element => {
      tab.push({
        tag_id: element,
        value: ""
      });
    });
    for (var i = 0; i < tab.length; i++) {
      tab[i]["value"] = this.state.tags[tab[i]["tag_id"]];
    }
    (await this._isMounted) &&
      this.setState({
        taggs: tab,
        copyTags: this.props.intel.tags
      });

    ApiCall.user
      .checkUserLikedByAndReverse(this.props.uid, this.props.intel.username)
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
  }

  handleLike = () => {
    this._isMounted &&
      this.setState({
        likesProfile: true
      });
    ApiCall.user.createUserLike(this.props.intel.id, this.props.uid);
    this.props.func(this.props.intel.id, "like");
  };

  handleDislike = () => {
    this._isMounted &&
      this.setState({
        likesProfile: false
      });
    ApiCall.user.deleteUserLike(this.props.intel.id, this.props.uid);
    this.props.func(this.props.intel.id, "dislike");
  };

  handleLikeBack = () => {
    this._isMounted &&
      this.setState({
        likesProfile: true
      });
    ApiCall.user.createUserLike(this.props.intel.id, this.props.uid);
    this.props.func(this.props.intel.id, "like_back");
  };

  async componentDidUpdate() {
    if (this.props.intel.tags !== this.state.copyTags) {
      var tab = [];
      await this.props.intel.tags.forEach(element => {
        tab.push({
          tag_id: element,
          value: ""
        });
      });
      for (var i = 0; i < tab.length; i++) {
        tab[i]["value"] = this.state.tags[tab[i]["tag_id"]];
      }
      (await this._isMounted) &&
        this.setState({
          taggs: tab,
          copyTags: this.props.intel.tags
        });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="col xs12 s6 m4">
        <div className="card sticky-action">
          <div className="card-image waves-effect waves-block waves-light user-card-image">
            <img
              className="activator"
              src={
                this.props.intel.profile_picture_url
                  ? this.props.intel.profile_picture_url
                  : this.props.intel.gender === "man"
                  ? ManPicture
                  : this.props.intel.gender === "woman"
                  ? WomanPicture
                  : NoGender
              }
              alt="Profile"
            />
          </div>
          <div className="card-content user-card-content">
            <div className="user-card-below-picture">
              <Popscore popscore={this.props.intel.pop_score} />
              {this.state.likesProfile === true ? (
                <div
                  className="user-card-dislike-btn"
                  onClick={
                    this.props.pictures
                      ? e => this.handleDislike()
                      : () => {
                          alert(
                            "You must add a picture to your profile to perform this action."
                          );
                        }
                  }
                >
                  <DislikeButton />
                </div>
              ) : this.state.likedByProfile === true ? (
                <div
                  className="user-card-like-back-btn"
                  onClick={
                    this.props.pictures
                      ? e => this.handleLikeBack()
                      : () => {
                          alert(
                            "You must add a picture to your profile to perform this action."
                          );
                        }
                  }
                >
                  <LikeBackButton />
                </div>
              ) : (
                <div
                  className="user-card-like-btn"
                  onClick={
                    this.props.pictures
                      ? e => this.handleLike()
                      : () => {
                          alert(
                            "You must add a picture to your profile to perform this action."
                          );
                        }
                  }
                >
                  <LikeButton />
                </div>
              )}
            </div>
            <div className="user-card-details">
              <span className="card-title activator grey-text text-darken-4 user-card-username">
                <span className="user-card-username-text">
                  {this.props.intel.username}{" "}
                </span>
                {this.props.intel.online === 1 ? (
                  <i className="material-icons dp48 online-icon">
                    fiber_manual_record
                  </i>
                ) : (
                  <span className="tooltip">
                    <i className="material-icons dp48 offline-icon">
                      fiber_manual_record
                    </i>{" "}
                    <span className="tooltip-text">
                      {this.props.intel.last_connexion
                        ? moment(this.props.intel.last_connexion).fromNow()
                        : "never seen online"}
                    </span>
                  </span>
                )}
                <i className="material-icons right user-card-bio-btn">
                  more_vert
                </i>
              </span>
              <div className="user-card-names">
                <span className="user-card-names-text">
                  <span>{this.props.intel.firstname}</span>{" "}
                  <span>{this.props.intel.lastname}</span>{" "}
                </span>
                <img
                  src={this.props.intel.gender === "man" ? Male : Female}
                  alt={
                    this.props.intel.gender === "man"
                      ? "male icon"
                      : "female icon"
                  }
                  className="profile-gender-icon"
                />
              </div>
              <div className="user-card-orientation">
                <i className="material-icons prefix pink-icon">wc</i>{" "}
                <span className="profile-text-icon">
                  {this.props.intel.sexual_orientation !== null ? (
                    this.props.intel.sexual_orientation
                  ) : (
                    <span className="grey-message">No preference yet</span>
                  )}
                </span>
              </div>
              <div className="user-card-location">
                <i className="material-icons prefix pink-icon">place</i>{" "}
                <span className="profile-text-icon">
                  {this.props.intel.city !== null ? (
                    this.props.intel.city
                  ) : (
                    <span className="grey-message">No location yet</span>
                  )}
                </span>
              </div>
              <div className="user-card-birthdate">
                <i className="material-icons prefix pink-icon">cake</i>{" "}
                <span className="profile-text-icon">
                  {this.props.intel.birthdate !== null ? (
                    this.props.intel.birthdate + " years old"
                  ) : (
                    <span className="grey-message">No birthdate yet</span>
                  )}
                </span>
              </div>
              <div className="user-card-interests">
                {" "}
                <InterestTagsOnly tags={this.state.taggs} />
              </div>
            </div>
          </div>
          <div className="card-action">
            <NavLink
              className="profile-link"
              to={"/users/profile/" + this.props.intel.username}
            >
              SEE PROFILE
            </NavLink>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Bio<i className="material-icons right">close</i>
            </span>
            <p>
              {this.props.intel.bio !== null || this.props.intel.bio === "" ? (
                this.props.intel.bio
              ) : (
                <span className="grey-message">No bio yet</span>
              )}
            </p>
            <InterestTagsOnly tags={this.state.taggs} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;

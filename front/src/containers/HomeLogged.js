import React, { Component } from "react";
import { connect } from "react-redux";
import AuthService from "../services/AuthService";
import UserCard from "../components/cards/UserCard";
import CompleteProfile from "../components/home/CompleteProfile";
import SuggestionsHeader from "../components/home/SuggestionsHeader";
import ModalUserEditProfileInfo from "../components/modals/ModalUserEditProfileInfo";
import ModalUserEditProfilePictures from "../components/modals/ModalUserEditProfilePictures";
import ModalMatchAnim from "../components/modals/ModalMatchAnim";
import Axios from "axios";
import io from "socket.io-client";
import ModalUserListFilter from "../components/modals/ModalUserListFilter";
import SortUserList from "../components/settings/SortUserList";
import { FilterUsersButton } from "../components/Buttons";
import HeartLoading from "../assets/heart-loading.gif";
import HeartBroken from "../assets/heart-broken.gif";

const CancelToken = Axios.CancelToken;
// eslint-disable-next-line
let cancel;

class HomeLogged extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      socket: "",
      defaultTab: [],
      userTab: [],
      defaultSorted: [],
      isLoading: true,
      tags: [],
      filterData: [],
      sortValue: "0",
      page: 12
    };
    this.Auth = new AuthService();
    this._isMounted = false;
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          {this.props.userConnectedData.id !== undefined &&
          (this.props.userConnectedData.gender === null ||
            this.props.userConnectedData.sexual_orientation === null ||
            this.props.userConnectedData.bio === null ||
            this.props.userConnectedData.birthdate === null ||
            this.props.userConnectedData.tags.length === 0 ||
            this.props.userConnectedData.pictures.length === 0) ? (
            <div>
              <CompleteProfile
                infoEdit={
                  this.props.userConnectedData.gender === null ||
                  this.props.userConnectedData.sexual_orientation === null ||
                  this.props.userConnectedData.bio === null ||
                  this.props.userConnectedData.birthdate === null ||
                  this.props.userConnectedData.tags.length === 0
                }
                picEdit={this.props.userConnectedData.pictures.length === 0}
              />
              {this.props.userConnectedData.id !== undefined && (
                <div>
                  <ModalUserEditProfileInfo />
                  <ModalUserEditProfilePictures />
                </div>
              )}
            </div>
          ) : (
            <div className="home-suggestions-list" disabled={true}>
              <SuggestionsHeader
                username={this.props.userConnectedData.username}
              />
              <div className="user-list-settings col s12">
                <FilterUsersButton />
                <SortUserList sortValueToParent={this.handleSortValue} />
              </div>
              {!this.state.isLoading ? (
                <this.userList
                  value={this.state.userTab.slice(0, this.state.page)}
                />
              ) : (
                <div className="userlist-loading">
                  <img
                    className="userlist-loading-img"
                    src={HeartLoading}
                    alt="Loading anim"
                  />
                  <div className="userlist-loading-text">Loading...</div>
                </div>
              )}
              <ModalUserListFilter filterDataToParent={this.handleFilterData} />
              <ModalMatchAnim />
            </div>
          )}
        </div>
      </div>
    );
  }

  handleSortValue = async data => {
    (await this._isMounted) &&
      this.setState({
        sortValue: data
      });
    switch (data) {
      case "0":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.pop_max - a.pop_max;
          })
        });
        break;
      case "1":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return a.birthdate - b.birthdate;
          })
        });
        break;
      case "2":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.birthdate - a.birthdate;
          })
        });
        break;
      case "3":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return a.geo_lat - b.geo_lat;
          })
        });
        break;
      case "4":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.geo_lat - a.geo_lat;
          })
        });
        break;
      case "5":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return a.pop_score - b.pop_score;
          })
        });
        break;
      case "6":
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            return b.pop_score - a.pop_score;
          })
        });
        break;
      case "7":
        var tags = [];
        if (this.state.filterData.userTags)
          this.state.filterData.userTags.forEach(element => {
            tags.push(element.tag_id);
          });
        else if (this.props.userConnectedData.tags)
          this.props.userConnectedData.tags.forEach(element => {
            tags.push(element.tag_id);
          });
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            var countA = 0;
            for (var i = 0; i < a.tags.length; i++) {
              if (tags.includes(a.tags[i])) countA++;
            }
            var countB = 0;
            for (var k = 0; k < b.tags.length; k++) {
              if (tags.includes(b.tags[k])) countB++;
            }
            return countA - countB;
          })
        });
        break;
      case "8":
        tags = [];
        if (this.state.filterData.userTags)
          this.state.filterData.userTags.forEach(element => {
            tags.push(element.tag_id);
          });
        else if (this.props.userConnectedData.tags)
          this.props.userConnectedData.tags.forEach(element => {
            tags.push(element.tag_id);
          });
        this.setState({
          userTab: this.state.userTab.sort((a, b) => {
            var countA = 0;
            for (var i = 0; i < a.tags.length; i++) {
              if (tags.includes(a.tags[i])) countA++;
            }
            var countB = 0;
            for (var k = 0; k < b.tags.length; k++) {
              if (tags.includes(b.tags[k])) countB++;
            }
            return countB - countA;
          })
        });
        break;
      default:
    }
  };

  handleFilterData = async data => {
    (await this._isMounted) &&
      this.setState({
        filterData: data
      });
    if (data.length !== 0) {
      this.updateTab();
      this.handleSortValue(this.state.sortValue);
      this.setState({
        page: 12
      });
    }
  };

  async componentDidMount() {
    this._isMounted = true;

    (await this._isMounted) &&
      this.setState({
        userID: this.Auth.getConfirm()["id"]
      });
    this._isMounted &&
      this.setState({
        socket: io({
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            userID: this.state.userID
          }
        })
      });

    await Axios.get("/main/suggestions/" + this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        this._isMounted &&
          this.setState({
            userTab: res.data.list,
            defaultTab: res.data.list,
            defaultSorted: res.data.list
          });
      })
      .catch(error => {
        console.log(error);
      });
    if (this.state.defaultTab.length) {
      this.initTab();
    }
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("scroll", this.infiniteScroll);
    if (this.state.socket !== "") this.state.socket.close();
  }

  initTab = () => {
    var tab = this.state.defaultTab.copyWithin(0);
    var copy = [];

    for (var i = 0; i < tab.length; i++) {
      var keep = 1;
      if (tab[i].birthdate > this.props.userConnectedData.age_max) keep = 0;
      if (tab[i].birthdate < this.props.userConnectedData.age_min) keep = 0;
      if (!(tab[i].geo_lat <= this.props.userConnectedData.distance_max + 0.8))
        keep = 0;
      if (
        !(
          tab[i].pop_score >= this.props.userConnectedData.pop_min &&
          tab[i].pop_score <= this.props.userConnectedData.pop_max
        )
      )
        keep = 0;
      if (keep === 1) copy.push(tab[i]);
    }
    this.setState({
      userTab: copy,
      isLoading: false
    });
  };

  updateTab = async () => {
    var tab = this.state.defaultTab.copyWithin(0);
    var copy = [];
    var tags = [];

    if (this.state.filterData.userTags)
      this.state.filterData.userTags.forEach(element => {
        tags.push(element.tag_id);
      });
    /* else if (this.props.userConnectedData.tags)
      this.props.userConnectedData.tags.forEach(element => {
        tags.push(element.tag_id);
      }); */

    for (var i = 0; i < tab.length; i++) {
      var keep = 1;
      if (tab[i].birthdate > this.state.filterData.ageRange[1]) keep = 0;
      if (tab[i].birthdate < this.state.filterData.ageRange[0]) keep = 0;
      if (!(tab[i].geo_lat <= this.state.filterData.distance + 0.8)) keep = 0;
      if (
        !(
          tab[i].pop_score >= this.state.filterData.popularityRange[0] &&
          tab[i].pop_score <= this.state.filterData.popularityRange[1]
        )
      )
        keep = 0;
      var count = 0;
      var newT = [];
      for (var k = 0; k < tab[i].tags.length; k++) newT.push(tab[i].tags[k]);
      for (var g = 0; g < newT.length; g++) {
        if (tags.includes(newT[g])) count++;
      }
      if (count !== tags.length) keep = 0;
      if (keep === 1) copy.push(tab[i]);
    }
    this.setState({
      userTab: copy,
      defaultSorted: copy
    });
  };

  sendNotif = (target_id, type) => {
    if (this.state.socket !== "") {
      this.state.socket.emit("sendNotif", type, this.state.userID, target_id);
    }
  };

  userList = props => {
    const value = props.value;
    if (props.value.length !== 0) {
      const users = value.map((e, index) => (
        <UserCard
          intel={e}
          uid={this.state.userID}
          func={this.sendNotif}
          key={index}
          pictures={
            this.props.userConnectedData.pictures.length > 0 ? true : false
          }
        />
      ));
      return <ul>{users}</ul>;
    } else {
      return (
        <div className="userlist-no-result">
          <img
            className="userlist-no-result-img"
            src={HeartBroken}
            alt="No result anim"
          />
          <div className="userlist-no-result-text">No result</div>
        </div>
      );
    }
  };

  infiniteScroll = () => {
    if (
      window.pageYOffset >=
      document.documentElement.offsetHeight -
        document.documentElement.clientHeight -
        420
    )
      this._isMounted &&
        this.setState({
          page: this.state.page + 12
        });
  };
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(mapStateToProps)(HomeLogged);

import React, { Component } from "react";
import { Modal } from "react-materialize";
import ApiCall from "../../services/ApiCall";
import ViewProfilesList from "../profileEdit/ViewProfilesList";

class ModalUserSupervise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      profilesVisited: [],
      profilesLiked: [],
      profilesBlocked: []
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    var profilesVisitedTab = [];
    var profilesLikedTab = [];
    var profilesBlockedTab = [];

    await ApiCall.user
      .getUserProfilesVisited(this.props.user_id)
      .then(async res => {
        if (res.length !== 0) {
          await res.profiles_visited.forEach(async (elem, index) => {
            await profilesVisitedTab.push(elem);
            await ApiCall.user
              .getUserListProfileDataFromId(elem.user_id)
              .then(async res => {
                if (res.data.length !== 0) {
                  profilesVisitedTab[index] = await Object.assign(
                    {},
                    profilesVisitedTab[index],
                    res.data[0]
                  );
                }
              });
          });
        }
      });

    await ApiCall.user
      .getUserProfilesLiked(this.props.user_id)
      .then(async res => {
        if (res.length !== 0) {
          await res.profiles_liked.forEach(async (elem, index) => {
            await profilesLikedTab.push(elem);
            await ApiCall.user
              .getUserListProfileDataFromId(elem.user_id)
              .then(async res => {
                if (res.data.length !== 0) {
                  profilesLikedTab[index] = await Object.assign(
                    {},
                    profilesLikedTab[index],
                    res.data[0]
                  );
                }
              });
          });
        }
      });

    await ApiCall.user
      .getUserProfilesBlocked(this.props.user_id)
      .then(async res => {
        if (res.length !== 0) {
          await res.profiles_blocked.forEach(async (elem, index) => {
            await profilesBlockedTab.push(elem);
            await ApiCall.user
              .getUserListProfileDataFromId(elem.user_id)
              .then(async res => {
                if (res.data.length !== 0) {
                  profilesBlockedTab[index] = await Object.assign(
                    {},
                    profilesBlockedTab[index],
                    res.data[0]
                  );
                }
              });
          });
        }
      });

    (await this._isMounted) &&
      this.setState({
        user_id: this.props.user_id,
        profilesVisited: profilesVisitedTab,
        profilesLiked: profilesLikedTab,
        profilesBlocked: profilesBlockedTab
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Modal
          id="user-supervise-modal"
          className="modals"
          header="Manage visits, likes, users blocked"
          fixedFooter
          trigger={false}
        >
          <p className="modal-intro">
            See profiles you visited, liked and ones you blocked
          </p>
          <div>
            <span className="profile-fields-labels">Users visited</span>
            <div className="user-list-reduced-container">
              <ViewProfilesList users={this.state.profilesVisited} />
            </div>
            <span className="profile-fields-labels">Users liked</span>
            <div className="user-list-reduced-container">
              <ViewProfilesList users={this.state.profilesLiked} />
            </div>
            <span className="profile-fields-labels">Users blocked</span>
            <div className="user-list-reduced-container">
              <ViewProfilesList users={this.state.profilesBlocked} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalUserSupervise;

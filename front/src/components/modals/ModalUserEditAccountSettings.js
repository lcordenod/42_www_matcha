import React, { Component } from "react";
import AgeSlider from "../settings/AgeSlider";
import DistanceSlider from "../settings/DistanceSlider";
import PopularitySlider from "../settings/PopularitySlider";
import EditEmailBox from "../settings/EditEmailBox";
import EditPasswordBox from "../settings/EditPasswordBox";
import DeleteAccountBtn from "../settings/DeleteAccountBtn";
import { Modal } from "react-materialize";
import * as actionCreators from "../../actions/user-actions";
import { connect } from "react-redux";

class ModalUserEditAccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      email: "",
      ageRange: [18, 99],
      distance: 5,
      popularityRange: [0, 1000]
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        userId: this.props.userConnectedData.id,
        email: this.props.userConnectedData.mail,
        ageRange: [
          this.props.userConnectedData.age_min,
          this.props.userConnectedData.age_max
        ],
        distance: this.props.userConnectedData.distance_max,
        popularityRange: [
          this.props.userConnectedData.pop_min,
          this.props.userConnectedData.pop_max
        ]
      });
  }

  handleAgeData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        age_min: data[0],
        age_max: data[1]
      }
    );
    this._isMounted &&
      this.setState({
        ageRange: data
      });
  };

  handleDistanceData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        distance_max: data
      }
    );
    this._isMounted &&
      this.setState({
        distance: data
      });
  };

  handlePopularityData = data => {
    this.props.updateUserData(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      {
        pop_min: data[0],
        pop_max: data[1]
      }
    );
    this._isMounted &&
      this.setState({
        popularityRange: data
      });
  };

  handleEmailData = data => {
    this._isMounted &&
      this.setState({
        email: data
      });
  };

  render() {
    return (
      <div>
        {this.state.userId !== null && (
          <Modal
            id="edit-account-modal"
            className="modals"
            header="Edit your account settings"
            fixedFooter
            trigger={false}
          >
            <p className="modal-intro">
              You can edit your Matcha discovery settings and personal account
              settings
            </p>
            <span className="profile-fields-labels">Discovery settings</span>
            <AgeSlider
              range={this.state.ageRange}
              ageToParent={this.handleAgeData}
            />
            <DistanceSlider
              value={this.state.distance}
              distanceToParent={this.handleDistanceData}
            />
            <PopularitySlider
              range={this.state.popularityRange}
              popularityToParent={this.handlePopularityData}
            />
            <span className="profile-fields-labels">Account settings</span>
            <EditEmailBox
              user={{ id: this.state.userId, email: this.state.email }}
              emailToParent={this.handleEmailData}
            />
            <EditPasswordBox userId={this.state.userId} />
            <DeleteAccountBtn />
          </Modal>
        )}
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(ModalUserEditAccountSettings);

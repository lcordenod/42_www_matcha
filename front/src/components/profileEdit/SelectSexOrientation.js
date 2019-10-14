import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/user-actions";

class SelectSexOrientation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexOrientation: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.userConnectedData.sexual_orientation !== null) {
      this._isMounted &&
        this.setState({
          sexOrientation: this.props.userConnectedData.sexual_orientation
        });
    }
  }

  handleChange = e => {
    if (
      e.target.value === "bi" ||
      e.target.value === "homo" ||
      e.target.value === "hetero"
    ) {
      this._isMounted &&
        this.setState({
          sexOrientation: e.target.value
        });
      this.props.updateUserData(
        this.props.userConnectedData.id,
        this.props.userConnectedData.username,
        { sexual_orientation: e.target.value }
      );
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="switch-field switch-three-fields">
        <input
          type="radio"
          id="radio-three"
          name="switch-two"
          value="bi"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "bi"}
          className="input-modal"
        />
        <label htmlFor="radio-three">Bi</label>
        <input
          type="radio"
          id="radio-four"
          name="switch-two"
          value="hetero"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "hetero"}
        />
        <label htmlFor="radio-four">Hetero</label>
        <input
          type="radio"
          id="radio-five"
          name="switch-two"
          value="homo"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "homo"}
          className="input-modal"
        />
        <label htmlFor="radio-five">Homo</label>
      </div>
    );
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
)(SelectSexOrientation);

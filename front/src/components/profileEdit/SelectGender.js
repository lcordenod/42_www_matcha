import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/user-actions";

class SelectGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.userConnectedData.gender !== null) {
      this._isMounted &&
        this.setState({
          gender: this.props.userConnectedData.gender
        });
    }
  }

  handleChange = e => {
    if (e.target.value === "man" || e.target.value === "woman") {
      this._isMounted &&
        this.setState({
          gender: e.target.value
        });
      this.props.updateUserData(
        this.props.userConnectedData.id,
        this.props.userConnectedData.username,
        { gender: e.target.value }
      );
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="switch-field switch-two-fields">
        <input
          type="radio"
          id="radio-one"
          name="switch-one"
          value="man"
          onChange={this.handleChange}
          checked={this.state.gender === "man"}
          className="input-modal"
        />
        <label htmlFor="radio-one">Man</label>
        <input
          type="radio"
          id="radio-two"
          name="switch-one"
          value="woman"
          onChange={this.handleChange}
          checked={this.state.gender === "woman"}
          className="input-modal"
        />
        <label htmlFor="radio-two">Woman</label>
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
)(SelectGender);

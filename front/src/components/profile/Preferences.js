import React, { Component } from "react";

class Preferences extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <p className="profile-info-title">Preferences</p>
          <span className="profile-orientation">
            <i className="material-icons prefix pink-icon">wc</i>{" "}
            <span className="profile-text-icon">
              {this.props.user.sexual_orientation}
            </span>
          </span>{" "}
        </div>
      </div>
    );
  }
}

export default Preferences;

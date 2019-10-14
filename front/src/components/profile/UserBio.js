import React, { Component } from "react";

class UserBio extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <p className="profile-info-title">Bio</p>
          {this.props.bio === null ? (
            <span className="grey-message">No bio yet</span>
          ) : (
            this.props.bio
          )}
        </div>
      </div>
    );
  }
}

export default UserBio;

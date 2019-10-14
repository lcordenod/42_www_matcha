import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Collection, CollectionItem } from "react-materialize";

class ViewProfilesList extends Component {
  listItems = users =>
    users.map(
      user =>
        user.username !== undefined && (
          <CollectionItem
            key={user.user_id}
            className="avatar view-profiles-list-item"
          >
            <img
              src={user.profile_picture_url}
              alt={"profile picture" + user.username}
              className="circle"
            />
            <span className="view-profiles-list-title">{user.username}</span>
            <p className="view-profiles-list-text">
              {user.firstname} {user.lastname}
            </p>
            <NavLink
              className="profile-link view-profiles-list-link"
              to={"/users/profile/" + user.username}
            >
              SEE <span className="view-profiles-list-text-sec">PROFILE</span>
            </NavLink>
          </CollectionItem>
        )
    );

  render() {
    return (
      <div>
        <Row>
          <Col s={12}>
            <Collection>{this.listItems(this.props.users)}</Collection>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewProfilesList;

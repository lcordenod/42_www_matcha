import React, { Component } from "react";
import { Col, Card } from "react-materialize";

class CompleteProfile extends Component {
  render() {
    return (
      <Col s={12}>
        <Card
          className="blue-grey"
          textClassName="white-text"
          title="Incomplete Profile"
          actions={[
            this.props.infoEdit ? (
              <a
                key={0}
                className="modal-trigger complete-profile-links"
                href="#edit-profile-modal"
              >
                Edit profile
              </a>
            ) : (
              undefined
            ),
            this.props.picEdit ? (
              <a
                key={1}
                className="modal-trigger complete-profile-links"
                href="#edit-pictures-modal"
              >
                Add picture
              </a>
            ) : (
              undefined
            )
          ]}
        >
          Love is only a few clicks away. Complete your profile to allow full
          access to Matcha suggestions
        </Card>
      </Col>
    );
  }
}

export default CompleteProfile;

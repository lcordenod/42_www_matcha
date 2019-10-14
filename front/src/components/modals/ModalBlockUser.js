import { Modal, Button } from "react-materialize";
import React, { Component } from "react";
import axios from "axios";
import InfoToastService from "../../services/InfoToastService";

class ModalBlockUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlocked: false
    };
  }

  handleBlock = () => {
    axios
      .get("/users/block/" + this.props.user_id + "/" + this.props.target_id)
      .then(res => {
        InfoToastService.custom.info(res.data.message, 5000);
        this.setState({ isBlocked: true });
        this.props.isBlocked();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal
          id="block-user-modal"
          className="modals"
          header="Block this user"
          trigger={false}
          actions={[
            <Button modal="close" flat>
              Cancel
            </Button>,
            <Button onClick={this.handleBlock} modal="close" flat>
              Confirm
            </Button>
          ]}
        >
          <p>Are you sure you want to block this user?</p>
          <p className="modal-sub-text">
            (By blocking this user you won't be able to receive messages nor
            notifications from this person. Also, he won't appear on suggestions
            and researches.)
          </p>
        </Modal>
      </div>
    );
  }
}

export default ModalBlockUser;

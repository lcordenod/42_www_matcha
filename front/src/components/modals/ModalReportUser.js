import { Modal, Button } from "react-materialize";
import React, { Component } from "react";
import axios from "axios";
import InfoToastService from "../../services/InfoToastService";

class ModalReportUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReported: false,
      isBlocked: false
    };
  }

  handleReport = () => {
    axios
      .get("/users/report/" + this.props.user_id + "/" + this.props.target_id)
      .then(res => {
        InfoToastService.custom.info(res.data.message, 3000);
        this.setState({ isReported: true });
        this.props.isReported();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {!this.state.isReported ? (
          <Modal
            id="report-user-modal"
            className="modals"
            header="Report this user"
            trigger={false}
            actions={[
              <Button modal="close" flat>
                Cancel
              </Button>,
              <Button onClick={this.handleReport} modal="close" flat>
                Confirm
              </Button>
            ]}
          >
            <p>Are you sure you want to report this user?</p>
            <p className="modal-sub-text">
              (User will be added to a list of fake profiles)
            </p>
          </Modal>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ModalReportUser;

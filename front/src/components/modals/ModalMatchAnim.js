import React, { Component } from "react";
import { Modal } from "react-materialize";
import { NavLink } from "react-router-dom";
import MatchAnim from "../../assets/match-love-anim.webp";

class ModalMatchAnim extends Component {
  render() {
    return (
      <div>
        <Modal
          header="That's a match!"
          trigger={false}
          id="match-anim-modal"
          className="modals modal-match-anim"
        >
          <p>Time to get to know each other!</p>
          <img
            className="img-match-anim"
            src={MatchAnim}
            alt="Match animation"
          />
          <p>
            Go to messages in order to talk to your matches
            <NavLink to={"/chat/messages"}>
              {" "}
              <i className="material-icons prefix pink-icon icon-vert-align">
                mail
              </i>
            </NavLink>
          </p>
        </Modal>
      </div>
    );
  }
}

export default ModalMatchAnim;

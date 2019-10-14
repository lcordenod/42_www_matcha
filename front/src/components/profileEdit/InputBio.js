import React, { Component } from "react";
import { Textarea } from "react-materialize";
import ValidateInput from "../../validation/ValidateInput";

class InputBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      bioValid: true,
      bioError: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.props.bio !== "") {
      this._isMounted &&
        this.setState({
          bio: this.props.bio
        });
    }
  }

  componentDidUpdate() {
    this._isMounted = true;
    if (this.state.bio !== this.props.bio) {
      document.querySelector("textarea[name='bio']").value = this.props.bio;
      this._isMounted &&
        this.setState({
          bio: this.props.bio,
          bioValid: true,
          bioError: ""
        });
      document.querySelector(".character-counter").innerText = "0/140";
      this.props.validInput(true);
    }
  }

  handleChange = e => {
    let result = ValidateInput.user.bio(e.target.value);

    this._isMounted &&
      this.setState({
        bio: e.target.value,
        bioValid: result.bioValid,
        bioError: result.bioError
      });
    this.props.bioToParent(e.target.value);
    this.props.validInput(result.bioValid);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Textarea
          name="bio"
          label="Say something about you..."
          onChange={this.handleChange}
          value={this.state.bio}
          data-length={140}
        />
        {!this.state.bioValid && (
          <div className="input-error-block">{this.state.bioError}</div>
        )}
      </div>
    );
  }
}

export default InputBio;

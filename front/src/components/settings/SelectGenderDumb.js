import React, { Component } from "react";

class SelectGenderDumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    this._isMounted &&
      this.setState({
        gender: this.props.value
      });
  }

  handleChange = e => {
    if (e.target.value === "man" || e.target.value === "woman") {
      this._isMounted &&
        this.setState({
          gender: e.target.value
        });
      this.props.genderToParent(e.target.value);
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

export default SelectGenderDumb;

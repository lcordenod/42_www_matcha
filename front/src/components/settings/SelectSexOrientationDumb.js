import React, { Component } from "react";

class SelectSexOrientationDumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexOrientation: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ gender: this.props.value });
  }

  handleChange = e => {
    if (
      e.target.value === "bi" ||
      e.target.value === "homo" ||
      e.target.value === "hetero"
    ) {
      this._isMounted &&
        this.setState({
          sexOrientation: e.target.value
        });
      this.props.SexOrientationToParent(e.target.value);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="switch-field switch-three-fields">
        <input
          type="radio"
          id="radio-three"
          name="switch-two"
          value="bi"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "bi"}
          className="input-modal"
        />
        <label htmlFor="radio-three">Bi</label>
        <input
          type="radio"
          id="radio-four"
          name="switch-two"
          value="hetero"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "hetero"}
        />
        <label htmlFor="radio-four">Hetero</label>
        <input
          type="radio"
          id="radio-five"
          name="switch-two"
          value="homo"
          onChange={this.handleChange}
          checked={this.state.sexOrientation === "homo"}
          className="input-modal"
        />
        <label htmlFor="radio-five">Homo</label>
      </div>
    );
  }
}

export default SelectSexOrientationDumb;

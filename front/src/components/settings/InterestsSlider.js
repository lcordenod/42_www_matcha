import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

class InterestsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        value: this.props.range
      });
  }

  handleChange = (e, newValue) => {
    this._isMounted &&
      this.setState({
        value: newValue
      });
  };

  handleChangeCommitted = (e, newValue) => {
    this.props.commonInterestsToParent(newValue);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-common-interests"
        >
          Number of interests in common
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-common-interests"
        >
          {this.state.value[0]}-{this.state.value[1]} interests
        </label>
        <Slider
          name="slider-edit-common-interests"
          min={1}
          max={25}
          value={this.state.value}
          onChange={this.handleChange}
          onChangeCommitted={this.handleChangeCommitted}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

export default InterestsSlider;

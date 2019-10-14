import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

class DistanceSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        value: this.props.value
      });
  }

  handleChange = (e, newValue) => {
    this._isMounted &&
      this.setState({
        value: newValue
      });
  };

  handleChangeCommitted = (e, newValue) => {
    this.props.distanceToParent(newValue);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="slider-container">
        <label
          className="left-label slider-label"
          htmlFor="slider-edit-distance"
        >
          Maximum distance (km)
        </label>
        <label
          className="right-label slider-label"
          htmlFor="slider-edit-distance"
        >
          {this.state.value} km
        </label>
        {this.state.value !== null && (
          <Slider
            name="slider-edit-distance"
            min={1}
            max={100}
            value={this.state.value}
            onChange={this.handleChange}
            onChangeCommitted={this.handleChangeCommitted}
            valueLabelDisplay="auto"
          />
        )}
      </div>
    );
  }
}

export default DistanceSlider;

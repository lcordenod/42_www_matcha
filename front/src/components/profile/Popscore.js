import React, { Component } from "react";

class Popscore extends Component {
  render() {
    var popStyle = {
      color:
        this.props.popscore === 0
          ? "#36b7cd"
          : this.props.popscore < 100
          ? "#ff7900"
          : "#e00034"
    };

    return (
      <div>
        <span className="popscore" style={popStyle}>
          {this.props.popscore}°
        </span>
      </div>
    );
  }
}

export default Popscore;

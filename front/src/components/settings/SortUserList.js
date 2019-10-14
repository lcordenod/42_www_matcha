import React, { Component } from "react";
import { Select } from "react-materialize";

class SortUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "0"
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  handleChange = e => {
    this._isMounted &&
      this.setState({
        selectedValue: e.target.value
      });
    this.props.sortValueToParent(e.target.value);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Select value={this.state.selectedValue} onChange={this.handleChange}>
        <option value="0">Compatibility</option>
        <option value="1">Age: youngest</option>
        <option value="2">Age: oldest</option>
        <option value="3">Distance: nearest</option>
        <option value="4">Distance: farthest</option>
        <option value="5">Popularity: lowest</option>
        <option value="6">Popularity: highest</option>
        <option value="7">Common tags: lowest</option>
        <option value="8">Common tags: highest</option>
      </Select>
    );
  }
}

export default SortUserList;

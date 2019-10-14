import React, { Component } from "react";
import { DatePicker } from "react-materialize";
import moment from "moment";

class BirthdatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: null
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        birthdate: this.props.birthdate
      });
  }

  componentDidUpdate() {
    this._isMounted = true;
    if (
      this.state.birthdate !== this.props.birthdate &&
      this.props.birthdate !== false
    ) {
      document.querySelector(
        "input[name='birthdate']"
      ).value = this.props.birthdate;
    }
  }

  handleChange = e => {
    this.props.birthdateToParent(
      document.querySelector(".birthdate-picker-modal").value
    );
    this._isMounted &&
      this.setState({
        birthdate: document.querySelector(".birthdate-picker-modal").value
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <label className="left-label" htmlFor="birthdate-edit-profile">
          Birthdate
        </label>
        <DatePicker
          name="birthdate"
          options={{
            defaultDate:
              this.props.birthdate !== null
                ? moment(new Date(this.props.birthdate)).format()
                : null,
            minDate: moment()
              .startOf("day")
              .subtract(99, "years")._d,
            maxDate: moment()
              .startOf("day")
              .subtract(18, "years")._d,
            setDefaultDate: true,
            container: "#root",
            onClose: this.handleChange
          }}
          className="birthdate-picker-modal"
          id="birthdate-edit-profile"
        />
      </div>
    );
  }
}

export default BirthdatePicker;

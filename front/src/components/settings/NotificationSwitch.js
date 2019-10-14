import React, { Component } from "react";
import { Switch } from "react-materialize";

class NotificationSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        status: this.props.notifications
      });
  }

  handleSwitch = () => {
    this._isMounted &&
      this.setState({
        status: !this.state.status
      });
    this.props.notificationsToParent(!this.state.status);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="notification-switch-box">
        <span className="notification-switch-label">Notifications</span>
        <Switch
          className="notification-switch"
          offLabel="Off"
          onLabel="On"
          checked={this.state.status}
          onClick={this.handleSwitch}
        />
      </div>
    );
  }
}

export default NotificationSwitch;

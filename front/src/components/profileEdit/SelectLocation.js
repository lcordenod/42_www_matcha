import React, { Component } from "react";
import { Autocomplete, Button, Icon } from "react-materialize";
import GeoPosition from "geolocator";
import InfoToast from "../../services/InfoToastService";
import ErrorToast from "../../services/ErrorToastService";
import cities from "../../assets/data-json/cities";
import * as actionCreators from "../../actions/user-actions";
import { connect } from "react-redux";

class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
      city: "Not set",
      cityInput: "",
      editLocationActive: false
    };
    this.citiesJSON = cities["France"];
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    await this.initGeolocator();
    if (
      this.props.userConnectedData.geo_lat &&
      this.props.userConnectedData.geo_long
    ) {
      await this.getCityFromLatLong(
        this.props.userConnectedData.geo_lat,
        this.props.userConnectedData.geo_long
      );
      (await this._isMounted) &&
        this.setState({
          lat: this.props.userConnectedData.geo_lat,
          long: this.props.userConnectedData.geo_long
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;
    if (
      prevState.city !== undefined &&
      prevState.city !== "" &&
      prevState.city !== "Not set" &&
      (this.state.lat !== prevState.lat || this.state.long !== prevState.long)
    ) {
      this.props.updateUserData(
        this.props.userConnectedData.id,
        this.props.userConnectedData.username,
        {
          city: this.state.city,
          geo_lat: this.state.lat,
          geo_long: this.state.long
        }
      );
      InfoToast.custom.info("Your city has been changed", 1500);
    }
  }

  initGeolocator = () => {
    GeoPosition.config({
      language: "en",
      google: {
        version: "3",
        key: "AIzaSyCrQGnPtopWTSK9joyPAxlEGcl535KlQQQ"
      }
    });
  };

  showPosition = pos => {
    var options = {
      enableHighAccuracy: true,
      desiredAccuracy: 30,
      timeout: 5000,
      maximumWait: 5000,
      maximumAge: 0,
      fallbackToIP: true,
      addressLookup: true
    };
    GeoPosition.locate(options, (err, location) => {
      //console.log(err || location);
      this._isMounted &&
        this.setState({
          userLocation: location,
          city: location.address.city,
          lat: location.coords.latitude,
          long: location.coords.longitude,
          locationValid: true
        });
    });
  };

  errorPosition = error => {
    var options = {
      homeMobileCountryCode: 208,
      homeMobileNetworkCode: 1,
      carrier: "Orange",
      radioType: GeoPosition.RadioType.GSM,
      fallbackToIP: true,
      addressLookup: true,
      timezone: false
    };
    GeoPosition.locateByMobile(options, (err, location) => {
      //console.log(err || location);
      this._isMounted &&
        this.setState({
          userLocation: location,
          city: location.address.city,
          lat: location.coords.latitude,
          long: location.coords.longitude,
          locationValid: true
        });
    });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.showPosition,
      this.errorPosition
    );
  };

  getCityFromLatLong = (lat, long) => {
    const coords = {
      latitude: lat,
      longitude: long
    };

    GeoPosition.reverseGeocode(coords, (err, location) => {
      if (location !== null)
        this._isMounted && this.setState({ city: location.address.city });
      else
        ErrorToast.custom.error(
          "Couldn't get city from coordinates, please try again later...",
          1400
        );
    });
  };

  getLatLongFromCity = city => {
    GeoPosition.geocode(city, (err, location) => {
      //console.log(err || location);
      if (location !== null && location.coords.longitude !== null) {
        this._isMounted &&
          this.setState({
            city: city,
            lat: location.coords.latitude,
            long: location.coords.longitude
          });
      }
    });
  };

  showEditLocation = () => {
    this._isMounted &&
      this.setState({
        editLocationActive: true
      });
  };

  hideEditLocation = () => {
    this._isMounted &&
      this.setState({
        editLocationActive: false
      });
  };

  switchEditLocation = () => {
    if (this.state.editLocationActive) this.hideEditLocation();
    else this.showEditLocation();
  };

  geolocateMe = () => {
    this.getLocation();
    this.hideEditLocation();
    InfoToast.custom.info(
      "Please wait while you are being geolocated...",
      1500
    );
  };

  confirmAutoCity = () => {
    document.querySelectorAll(".edit-location-submit")[0].disabled = false;
  };

  handleAutocompleteSubmit = () => {
    if (
      document.querySelectorAll(".edit-location-autoc-input > input")[0].value
    ) {
      this.getLatLongFromCity(
        document.querySelectorAll(".edit-location-autoc-input > input")[0].value
      );
      this.hideEditLocation();
    } else {
      ErrorToast.custom.error("Please enter a city", 1400);
    }
  };

  handleAutocompleteChange = () => {
    document.querySelectorAll(".edit-location-submit")[0].disabled = true;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="location-container">
        {this.state.city}
        <Button
          waves="light"
          style={{ marginLeft: "15px" }}
          onClick={this.switchEditLocation}
        >
          Edit
          <Icon left>edit_location</Icon>
        </Button>
        {this.state.editLocationActive && (
          <div className="edit-location-input">
            <div className="edit-location-autoc">
              <Autocomplete
                className="edit-location-autoc-input"
                style={{ display: "inline-block" }}
                options={{
                  data: this.citiesJSON,
                  minLength: 3,
                  onAutocomplete: this.confirmAutoCity
                }}
                placeholder="Insert city here (3 letters min)"
                icon="place"
                onChange={this.handleAutocompleteChange}
              />
              <Button
                className="edit-location-submit"
                onClick={this.handleAutocompleteSubmit}
              >
                Confirm
              </Button>
            </div>
            <p>Or</p>
            <Button waves="light" onClick={this.geolocateMe}>
              Geolocate me
              <Icon left>location_searching</Icon>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(SelectLocation);

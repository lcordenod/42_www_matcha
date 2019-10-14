import React, { Component } from "react";
import AgeSlider from "../settings/AgeSlider";
import DistanceSlider from "../settings/DistanceSlider";
import PopularitySlider from "../settings/PopularitySlider";
import InterestTagsDumb from "../settings/InterestTagsDumb";
import SelectGenderDumb from "../settings/SelectGenderDumb";
import SelectSexOrientationDumb from "../settings/SelectSexOrientationDumb";

class SearchCriteria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageRange: [18, 99],
      distance: 5,
      popularityRange: [0, 1000],
      gender: "",
      sexOrientation: "bi",
      userTags: [],
      allTags: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.searchDataToParent({
      ageRange: this.state.ageRange,
      distance: this.state.distance,
      popularityRange: this.state.popularityRange,
      gender: this.state.gender,
      sexOrientation: this.state.sexOrientation,
      userTags: this.state.userTags
    });
  }

  handleAgeData = data => {
    this._isMounted &&
      this.setState({
        ageRange: data
      });
    this.props.searchDataToParent({
      ageRange: data,
      distance: this.state.distance,
      popularityRange: this.state.popularityRange,
      gender: this.state.gender,
      sexOrientation: this.state.sexOrientation,
      userTags: this.state.userTags
    });
  };

  handleDistanceData = data => {
    this._isMounted &&
      this.setState({
        distance: data
      });
    this.props.searchDataToParent({
      ageRange: this.state.ageRange,
      distance: data,
      popularityRange: this.state.popularityRange,
      gender: this.state.gender,
      sexOrientation: this.state.sexOrientation,
      userTags: this.state.userTags
    });
  };

  handlePopularityData = data => {
    this._isMounted &&
      this.setState({
        popularityRange: data
      });
    this.props.searchDataToParent({
      ageRange: this.state.ageRange,
      distance: this.state.distance,
      popularityRange: data,
      gender: this.state.gender,
      sexOrientation: this.state.sexOrientation,
      userTags: this.state.userTags
    });
  };

  handleInterestsData = data => {
    this._isMounted &&
      this.setState({
        userTags: data
      });
    this.props.searchDataToParent({
      ageRange: this.state.ageRange,
      distance: this.state.distance,
      popularityRange: this.state.popularityRange,
      gender: this.state.gender,
      sexOrientation: this.state.sexOrientation,
      userTags: data
    });
  };

  handleGenderData = data => {
    this._isMounted &&
      this.setState({
        gender: data
      });
    this.props.searchDataToParent({
      ageRange: this.state.ageRange,
      distance: this.state.distance,
      popularityRange: this.state.popularityRange,
      gender: data,
      sexOrientation: this.state.sexOrientation,
      userTags: this.state.userTags
    });
  };

  handleSexOrientationData = data => {
    this._isMounted &&
      this.setState({
        sexOrientation: data
      });
    this.props.searchDataToParent({
      ageRange: this.state.ageRange,
      distance: this.state.distance,
      popularityRange: this.state.popularityRange,
      gender: this.state.gender,
      sexOrientation: data,
      userTags: this.state.userTags
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="search-criteria">
        <span className="profile-fields-labels">Age</span>
        <AgeSlider
          range={this.state.ageRange}
          ageToParent={this.handleAgeData}
        />
        <DistanceSlider
          value={this.state.distance}
          distanceToParent={this.handleDistanceData}
        />
        <PopularitySlider
          range={this.state.popularityRange}
          popularityToParent={this.handlePopularityData}
        />
        <span className="profile-fields-labels">Orientation</span>
        <SelectGenderDumb genderToParent={this.handleGenderData} />
        <SelectSexOrientationDumb
          SexOrientationToParent={this.handleSexOrientationData}
        />
        <span className="profile-fields-labels">Interests</span>
        <InterestTagsDumb
          tags={this.state.userTags}
          allTags={this.props.allTags}
          interestsToParent={this.handleInterestsData}
        />
      </div>
    );
  }
}

export default SearchCriteria;

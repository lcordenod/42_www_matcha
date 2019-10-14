import React, { Component } from "react";
import { Chip } from "react-materialize";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/tag-actions";
import InfoToast from "../../services/InfoToastService";

class InterestTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTagsArray: [],
      defaultTagsArray: []
    };
    this.chipDelete = this.chipDelete.bind(this);
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        myTagsArray: this.props.userConnectedData.tags,
        defaultTagsArray: this.props.userConnectedData.allTags
      });
  }

  componentDidUpdate() {
    this._isMounted = true;
    if (this.state.myTagsArray !== this.props.userConnectedData.tags) {
      this._isMounted &&
        this.setState({
          myTagsArray: this.props.userConnectedData.tags
        });
    }
  }

  createMyTags(tab) {
    this._isMounted &&
      this.setState({
        myTagsArray: tab
      });
  }

  chipDelete(tag_id) {
    this.props.deleteUserTag(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      tag_id
    );
  }

  chipSelectDefault(tag_id, value) {
    if (!this.state.myTagsArray.find(tag => tag.tag_id === tag_id)) {
      this._isMounted &&
        this.setState({
          myTagsArray: [
            ...this.state.myTagsArray,
            { tag_id: tag_id, value: value }
          ]
        });
      this.props.createUserTag(
        this.props.userConnectedData.id,
        this.props.userConnectedData.username,
        tag_id
      );
    } else {
      InfoToast.custom.info(`Tag ${value} has already been added`, 1500);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    function tagToArray(tagValue) {
      return [
        {
          tag: tagValue
        }
      ];
    }

    const myTags = this.state.myTagsArray.map(tagEl => (
      <Chip
        key={tagEl.tag_id}
        options={{
          data: tagToArray(tagEl.value),
          onChipDelete: () => this.chipDelete(tagEl.tag_id)
        }}
        className="my-tags-chip chip-general"
      />
    ));

    const defaultTags = this.state.defaultTagsArray.map(tagEl => (
      <Chip
        key={tagEl.tag_id}
        close={false}
        options={{
          data: tagToArray(tagEl.value),
          onChipSelect: () => this.chipSelectDefault(tagEl.tag_id, tagEl.value)
        }}
        className="chip-general"
      />
    ));

    const emptyTags = <p className="no-tags-message">No interests yet</p>;

    return (
      <div className="tags-component">
        <div>
          <p>Already interested in</p>
          {myTags.length ? myTags : emptyTags}
        </div>
        <div className="chips-default-tags">
          <p>Add more interests</p>
          {defaultTags}
        </div>
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
)(InterestTags);

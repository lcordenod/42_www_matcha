import React, { Component } from "react";
import { Chip } from "react-materialize";
import InfoToast from "../../services/InfoToastService";

class InterestTagsDumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTagsArray: [],
      defaultTagsArray: []
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        myTagsArray: [...this.props.tags],
        defaultTagsArray: this.props.allTags
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  chipSelectDefault(tag_id, value) {
    if (!this.state.myTagsArray.find(tag => tag.tag_id === tag_id)) {
      this.props.interestsToParent([
        ...this.state.myTagsArray,
        { tag_id: tag_id, value: value }
      ]);
      this._isMounted &&
        this.setState({
          myTagsArray: [
            ...this.state.myTagsArray,
            { tag_id: tag_id, value: value }
          ]
        });
    } else {
      InfoToast.custom.info(`Tag ${value} has already been added`, 1500);
    }
  }

  chipDelete(tag_id) {
    let tagsTab = this.state.myTagsArray;

    for (var i = 0; i < tagsTab.length; i++) {
      if (tagsTab[i].tag_id === tag_id) {
        tagsTab.splice(i, 1);
      }
    }

    this._isMounted &&
      this.setState({
        myTagsArray: tagsTab
      });

    this.props.interestsToParent(tagsTab);
  }

  render() {
    function tagToArray(tagValue) {
      return [
        {
          tag: tagValue
        }
      ];
    }

    const tags = this.state.myTagsArray.map(tagEl => (
      <Chip
        key={tagEl.tag_id}
        options={{
          data: tagToArray(tagEl.value),
          onChipDelete: () => this.chipDelete(tagEl.tag_id)
        }}
        className="my-tags-chip chip-general"
      />
    ));

    const allTags = this.state.defaultTagsArray.map(tagEl => (
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
          <p>Selected interests</p>
          {tags.length ? tags : emptyTags}
        </div>
        <div className="chips-default-tags">
          <p>Add more interests</p>
          {allTags}
        </div>
      </div>
    );
  }
}

export default InterestTagsDumb;

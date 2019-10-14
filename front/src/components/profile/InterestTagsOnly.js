import React, { Component } from "react";
import { Chip } from "react-materialize";

class InterestTagsOnly extends Component {
  render() {
    function tagToArray(tagValue) {
      return [
        {
          tag: tagValue
        }
      ];
    }

    const Tags = this.props.tags.map(tagEl => (
      <Chip
        key={tagEl.tag_id}
        close={false}
        options={{
          data: tagToArray(tagEl.value)
        }}
        className="chip-general"
      />
    ));

    const emptyTags = <p className="no-tags-message">No interests yet</p>;

    return (
      <div className="interest-tags-only">
        {Tags.length ? (
          <div className="chips-default-tags">{Tags}</div>
        ) : (
          emptyTags
        )}
      </div>
    );
  }
}

export default InterestTagsOnly;

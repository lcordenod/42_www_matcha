import React, { Component } from "react";
import { Button } from "react-materialize";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/picture-actions";
import ErrorToast from "../../services/ErrorToastService";

class EditProfilePictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
        {
          profile_picture: 0,
          url: ""
        },
        {
          profile_picture: 0,
          url: ""
        },
        {
          profile_picture: 0,
          url: ""
        },
        {
          profile_picture: 0,
          url: ""
        },
        {
          profile_picture: 0,
          url: ""
        }
      ]
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    var picture_1 = this.props.userConnectedData.pictures.filter(pic => {
      return pic.pic_index === 0;
    });
    var picture_2 = this.props.userConnectedData.pictures.filter(pic => {
      return pic.pic_index === 1;
    });
    var picture_3 = this.props.userConnectedData.pictures.filter(pic => {
      return pic.pic_index === 2;
    });
    var picture_4 = this.props.userConnectedData.pictures.filter(pic => {
      return pic.pic_index === 3;
    });
    var picture_5 = this.props.userConnectedData.pictures.filter(pic => {
      return pic.pic_index === 4;
    });
    this._isMounted &&
      this.setState({
        pictures: [
          {
            profile_picture:
              picture_1.length !== 0 ? picture_1[0].profile_picture : 0,
            url: picture_1.length !== 0 ? picture_1[0].url : ""
          },
          {
            profile_picture:
              picture_2.length !== 0 ? picture_2[0].profile_picture : 0,
            url: picture_2.length !== 0 ? picture_2[0].url : ""
          },
          {
            profile_picture:
              picture_3.length !== 0 ? picture_3[0].profile_picture : 0,
            url: picture_3.length !== 0 ? picture_3[0].url : ""
          },
          {
            profile_picture:
              picture_4.length !== 0 ? picture_4[0].profile_picture : 0,
            url: picture_4.length !== 0 ? picture_4[0].url : ""
          },
          {
            profile_picture:
              picture_5.length !== 0 ? picture_5[0].profile_picture : 0,
            url: picture_5.length !== 0 ? picture_5[0].url : ""
          }
        ]
      });
  }

  handlePictureSelect = (index, e) => {
    let file = e.target.files[0];
    if (file && file.size / 1024 / 1024 < 2) {
      if (this.isPictureTypeValid(file)) {
        this.processPictureFileIfValid(file, e.target, index);
      } else {
        ErrorToast.custom.error("Please upload a correct image", 1400);
      }
    } else {
      ErrorToast.custom.error(
        "Please upload a correct image (less than 2mb)",
        1400
      );
    }
  };

  isPictureTypeValid = file => {
    let imageType = /image.*/;
    if (!file.type.match(imageType)) {
      return false;
    }
    return true;
  };

  processPictureFileIfValid = (file, target, index) => {
    let pic = new Image();

    pic.src = window.URL.createObjectURL(file);
    pic.onload = () => {
      let width = pic.naturalWidth;
      let height = pic.naturalHeight;
      window.URL.revokeObjectURL(pic.src);
      if (width && height) {
        this.processPicture(file, target, index);
      } else {
        ErrorToast.custom.error("Please upload a correct image", 1400);
      }
    };
  };

  doesMainProfilePicExist = pictures => {
    return pictures.some(picture => {
      return picture["profile_picture"] === 1;
    });
  };

  processPicture = (file, target, index) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const pics = this.state.pictures;
      pics[index].url = reader.result;
      if (!this.doesMainProfilePicExist(pics)) pics[index].profile_picture = 1;
      this.props.updateUserPicture(
        this.props.userConnectedData.id,
        this.props.userConnectedData.username,
        {
          pic_index: index,
          url: pics[index].url,
          profile_picture: pics[index].profile_picture
        }
      );
      this._isMounted &&
        this.setState({
          pictures: pics
        });
    };
    reader.readAsDataURL(file);
    target.closest(".picture-box").querySelector(".image-upload").value = "";
    this.setNoPictureDefault(target);
  };

  makeProfilePicture = index => {
    if (index === false) {
      return;
    }
    const pics = this.state.pictures;
    pics.forEach(pic => {
      pic.profile_picture = 0;
    });
    pics[index].profile_picture = 1;
    this.props.updateUserProfilePicture(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      index,
      pics[index].url
    );
    this._isMounted &&
      this.setState({
        pictures: pics
      });
  };

  setNoPictureDefault = target => {
    if (
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview")
        .className.indexOf("js--no-default") === -1
    )
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview").className += " js--no-default";
  };

  removeNoPictureDefault = target => {
    if (
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview")
        .className.indexOf("js--no-default") !== -1
    )
      target
        .closest(".picture-box")
        .querySelector(".js--image-preview")
        .classList.remove("js--no-default");
  };

  showEditPictureUI = e => {
    e.target
      .closest(".js--image-preview")
      .querySelector(".btn-container-edit-picture").style.display = "block";
  };

  hideEditPictureUI = e => {
    e.target
      .closest(".js--image-preview")
      .querySelector(".btn-container-edit-picture").style.display = "none";
  };

  showMessageToAddPic = e => {
    e.target.closest(".js--image-preview").style.opacity = "0.5";
    e.target
      .closest(".js--image-preview")
      .querySelector(".placeholder-message-no-pic").style.display = "block";
  };

  hideMessageToAddPic = e => {
    e.target.closest(".js--image-preview").style.opacity = "1";
    e.target
      .closest(".js--image-preview")
      .querySelector(".placeholder-message-no-pic").style.display = "none";
  };

  findExistingPicture = index => {
    let i = 0;
    while (i < this.state.pictures.length) {
      if (i === index) {
        i++;
      } else if (this.state.pictures[i].url !== "") {
        return i;
      } else {
        i++;
      }
    }
    return false;
  };

  handleRemovePicture = (index, e) => {
    e.target
      .closest(".picture-box")
      .querySelector(".js--image-preview").style.backgroundImage = "url()";
    if (this.state.pictures[index].profile_picture === 1) {
      this.makeProfilePicture(this.findExistingPicture(index));
    }
    const pics = this.state.pictures;
    pics[index].url = "";
    pics[index].profile_picture = 0;
    this.props.deleteUserPicture(
      this.props.userConnectedData.id,
      this.props.userConnectedData.username,
      index
    );
    this._isMounted &&
      this.setState({
        pictures: pics
      });
    this.removeNoPictureDefault(
      e.target.closest(".picture-box").querySelector(".js--image-preview")
    );
  };

  render() {
    const pictureBoxes = this.state.pictures.map((picture, index) => (
      <div className="picture-box" key={index}>
        <div
          className={
            picture.url !== ""
              ? "js--image-preview js--no-default"
              : "js--image-preview"
          }
          onMouseOver={
            picture.url !== ""
              ? e => this.showEditPictureUI(e)
              : e => this.showMessageToAddPic(e)
          }
          onMouseLeave={
            picture.url !== ""
              ? e => this.hideEditPictureUI(e)
              : e => this.hideMessageToAddPic(e)
          }
          style={{ backgroundImage: `url(${picture.url})` }}
        >
          {picture.url !== "" && (
            <div>
              {picture.profile_picture === 1 && (
                <Button
                  floating
                  icon="star"
                  className="blue btn-star-picture-main"
                  tooltip="Main profile picture"
                  waves="light"
                />
              )}
              <div className="btn-container-edit-picture">
                {picture.profile_picture === 0 && (
                  <Button
                    floating
                    icon="star"
                    className="blue btn-star-picture"
                    tooltip="Make profile picture"
                    waves="light"
                    onClick={() => this.makeProfilePicture(index)}
                  />
                )}
                <Button
                  floating
                  icon="delete"
                  className="red btn-delete-picture"
                  tooltip="Delete picture"
                  waves="light"
                  onClick={e => this.handleRemovePicture(index, e)}
                />
              </div>
            </div>
          )}
          {picture.url === "" && (
            <div className="placeholder-message-no-pic">
              Add a picture by clicking on "+"
            </div>
          )}
        </div>
        <div
          className="upload-options"
          onChange={e => this.handlePictureSelect(index, e)}
        >
          <label>
            <input type="file" className="image-upload" accept="image/*" />
            <i className="material-icons picture-edit-add-icon">
              {picture.url !== "" ? "edit" : "add"}
            </i>
          </label>
        </div>
      </div>
    ));
    return <div className="edit-pictures-box">{pictureBoxes}</div>;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
)(EditProfilePictures);

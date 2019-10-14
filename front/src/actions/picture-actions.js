import axios from "axios";
import ApiCall from "../services/ApiCall";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";
export const USER_RECEIVED = "USER_RECEIVED";
export const UPDATE_PICTURE = "UPDATE_PICTURE";
export const PICTURE_UPDATED = "PICTURE_UPDATED";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";
export const PROFILE_PICTURE_UPDATED = "PROFILE_PICTURE_UPDATED";
export const ERROR = "ERROR";

const apiUrl = "/users";

export const deleteUserPicture = (user_id, username, pic_index) => {
  return dispatch => {
    dispatch({ type: "UPDATE_PICTURE" });
    ApiCall.user
      .deleteUserPicture(user_id, pic_index)
      .then(response => {
        dispatch({
          type: "PICTURE_UPDATED",
          payload: { user_id, pic_index }
        });
        axios
          .get(`${apiUrl}/profile/${username}`)
          .then(response => {
            InfoToast.custom.info("Deleted", 1400);
            dispatch({ type: "USER_RECEIVED", payload: response.data });
          })
          .catch(error => {
            dispatch({
              type: "ERROR",
              payload: error
            });
          });
      })
      .catch(error => {
        ErrorToast.custom.error(error.response["data"]["error"], 1400);
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const updateUserPicture = (user_id, username, data) => {
  return dispatch => {
    dispatch({ type: "UPDATE_PICTURE" });
    ApiCall.user
      .updateUserPicture(user_id, data)
      .then(response => {
        dispatch({
          type: "PICTURE_UPDATED",
          payload: { user_id, username, data }
        });
        axios
          .get(`${apiUrl}/profile/${username}`)
          .then(response => {
            InfoToast.custom.info("Updated", 1400);
            dispatch({ type: "USER_RECEIVED", payload: response.data });
          })
          .catch(error => {
            dispatch({
              type: "ERROR",
              payload: error
            });
          });
      })
      .catch(error => {
        ErrorToast.custom.error(error.response["data"]["error"], 1400);
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const updateUserProfilePicture = (
  user_id,
  username,
  pic_index,
  pic_url
) => {
  return dispatch => {
    dispatch({ type: "UPDATE_PROFILE_PICTURE" });
    ApiCall.user
      .updateUserProfilePicture(user_id, pic_index, pic_url)
      .then(response => {
        dispatch({
          type: "PROFILE_PICTURE_UPDATED",
          payload: { user_id, username, pic_index }
        });
        axios
          .get(`${apiUrl}/profile/${username}`)
          .then(response => {
            InfoToast.custom.info("Profile picture changed", 1400);
            dispatch({ type: "USER_RECEIVED", payload: response.data });
          })
          .catch(error => {
            dispatch({
              type: "ERROR",
              payload: error
            });
          });
      })
      .catch(error => {
        ErrorToast.custom.error(error.response["data"]["error"], 1400);
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

import axios from "axios";
import ApiCall from "../services/ApiCall";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";
export const USER_RECEIVED = "USER_RECEIVED";
export const UPDATE_TAG = "UPDATE_TAG";
export const TAG_UPDATED = "TAG_UPDATED";
export const ERROR = "ERROR";

const apiUrl = "/users";

export const deleteUserTag = (user_id, username, tag_id) => {
  return dispatch => {
    dispatch({ type: "UPDATE_TAG" });
    ApiCall.user
      .deleteUserTag(user_id, tag_id)
      .then(response => {
        dispatch({
          type: "TAG_UPDATED",
          payload: { user_id, username, tag_id }
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

export const createUserTag = (user_id, username, tag_id) => {
  return dispatch => {
    dispatch({ type: "UPDATE_TAG" });
    ApiCall.user
      .createUserTag(user_id, tag_id)
      .then(response => {
        dispatch({
          type: "TAG_UPDATED",
          payload: { user_id, username, tag_id }
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

import axios from "axios";
import ApiCall from "../services/ApiCall";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";
export const GET_USER = "GET_USER";
export const USER_RECEIVED = "USER_RECEIVED";
export const UPDATE_USER = "UPDATE_USER";
export const USER_UPDATED = "USER_UPDATED";
export const DELETE_USER = "DELETE_USER";
export const USER_DELETED = "USER_DELETED";
export const ERROR = "ERROR";

const apiUrl = "/users";

export const getUserData = username => {
  return dispatch => {
    dispatch({ type: "GET_USER" });
    axios
      .get(`${apiUrl}/profile/${username}`)
      .then(response => {
        dispatch({ type: "USER_RECEIVED", payload: response.data });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
    dispatch({ type: "AFTER_ASYNC" });
  };
};

export const updateUserData = (id, username, data) => {
  return dispatch => {
    dispatch({ type: "UPDATE_USER" });
    ApiCall.user
      .updateUserData(id, data)
      .then(response => {
        dispatch({ type: "USER_UPDATED", payload: data });
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
        console.log(error);
        ErrorToast.custom.error(error.response["data"]["error"], 1400);
        dispatch({ type: "ERROR", payload: error });
      });
    dispatch({ type: "AFTER_ASYNC" });
  };
};

export const updateUserField = (id, username, field, data) => {
  return dispatch => {
    dispatch({ type: "UPDATE_USER" });
    ApiCall.user
      .updateUserField(id, field, data)
      .then(response => {
        dispatch({ type: "USER_UPDATED", payload: data });
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
    dispatch({ type: "AFTER_ASYNC" });
  };
};

export const deleteUserData = (id, headers) => {
  return dispatch => {
    dispatch({ type: "DELETE_USER", payload: id });
    ApiCall.user
      .deleteUser(id, headers)
      .then(response => {
        dispatch({ type: "USER_DELETED" });
      })
      .catch(error => {
        ErrorToast.custom.error("An error occured, please try again", 1400);
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

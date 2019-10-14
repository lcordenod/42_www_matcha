import {
  UPDATE_PICTURE,
  PICTURE_UPDATED,
  UPDATE_PROFILE_PICTURE,
  PROFILE_PICTURE_UPDATED,
  ERROR
} from "../actions/picture-actions";

const initalState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: "",
  statusClass: ""
};

function pictureReducer(state = initalState, { type, payload }) {
  switch (type) {
    case UPDATE_PICTURE:
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        status: "Pending...",
        statusClass: "pending"
      };
    case PICTURE_UPDATED:
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        dataSent: payload,
        status: "User Updated",
        statusClass: "updated"
      };
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        status: "Pending...",
        statusClass: "pending"
      };
    case PROFILE_PICTURE_UPDATED:
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        dataSent: payload,
        status: "User Updated",
        statusClass: "updated"
      };
    case ERROR:
      return {
        ...state,
        sendingRequest: false,
        requestReceived: false,
        status: `${payload.message}`,
        statusClass: "error"
      };
    default:
      return state;
  }
}

export default pictureReducer;

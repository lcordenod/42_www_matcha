import { UPDATE_TAG, TAG_UPDATED, ERROR } from "../actions/tag-actions";

const initalState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: "",
  statusClass: ""
};

function tagReducer(state = initalState, { type, payload }) {
  switch (type) {
    case UPDATE_TAG:
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        status: "Pending...",
        statusClass: "pending"
      };
    case TAG_UPDATED:
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

export default tagReducer;

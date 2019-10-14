import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import tagReducer from "./tag-reducer";
import pictureReducer from "./picture-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  tag: tagReducer,
  picture: pictureReducer
});

export default rootReducer;

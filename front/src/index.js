import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { render } from "react-dom";
import MainRouter from "./routes";
import { Provider } from "react-redux";
import configureStore from "./store";
import { getUserData } from "./actions/user-actions";
import AuthService from "./services/AuthService";

const Auth = new AuthService();
const store = configureStore();

if (Auth.loggedIn()) {
  store.dispatch(getUserData(Auth.getConfirm().username));
}

render(
  <Provider store={store}>
    <MainRouter />
  </Provider>,
  document.getElementById("root")
);

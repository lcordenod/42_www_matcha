import Materialize from "materialize-css";

export default {
  custom: {
    error: (message, length) => {
      Materialize.toast({
        html: message,
        displayLength: length,
        classes: "rounded error-toast"
      });
    }
  },
  user: {
    userNotFound: () => {
      Materialize.toast({
        html: "couldn't find this user",
        displayLength: 1200,
        classes: "rounded error-toast"
      });
    }
  },
  auth: {
    pageRequiresLogin: () => {
      Materialize.toast({
        html: "you must log in to access this page",
        displayLength: 1200,
        classes: "rounded error-toast"
      });
    },
    userAlreadyLogged: () => {
      Materialize.toast({
        html: "you are already logged in",
        displayLength: 1000,
        classes: "rounded error-toast"
      });
    },
    invalidPwdResetKey: () => {
      Materialize.toast({
        html: "password reset key is invalid",
        displayLength: 1000,
        classes: "rounded error-toast"
      });
    }
  }
};

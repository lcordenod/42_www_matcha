import React from "react";
import { NavLink } from "react-router-dom";

const Notfound = () => (
  <div className="div-centered">
    <h1>Page not found :(</h1>
    <NavLink to="/" className="pink-link">
      Go back to homepage
    </NavLink>
  </div>
);

export default Notfound;

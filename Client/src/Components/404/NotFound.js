import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

const NotFound = () => {
  console.log("not found");
  return (
    <div className={"notfound"}>
      <div>
        <h1 className="notfound-text">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h1>
        <p className="notfound-text">Sorry, this page does not exist</p>
        <Link to="/" className="link-btn">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

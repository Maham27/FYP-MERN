import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="foooter">
      <div className="columns">
        <div className="column_two">
          {/* <img src={Logo} alt="logo" /> */}

          <Link to="/">Home</Link>
          <Link to="/lawyers">Explore</Link>
        </div>
        <div className="column_one">
          <h1>About Us</h1>
          <p>
            We are providing platform to the lawyers and clients connect with
            each other. Lawyers can earn from appointments and clients can book
            appointments with any lawyer of their choice. Our motto is to
            provide you time and place freedom.
          </p>
        </div>
        <div className="column_three">
          <div className="row_two">LAWYERS SERVICES &copy; 2023 </div>
          <div className="row_one">
            <h4>Follow Us : </h4>
            <div className="social__icons">
              <Link to="www.facebook.com">
                <FacebookIcon />
              </Link>
              <Link to="www.instagram.com">
                <InstagramIcon />
              </Link>
              <Link to="www.linkedin.com">
                <LinkedInIcon />
              </Link>
              <Link to="www.twitter.com">
                <TwitterIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import "./HeroSection.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HeroSection = () => {
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  return (
    <div className="hero__section">
      {" "}
      <header className="home__header">
        <div className="header__content">
          <h3>We offer legal services to prospective clients by connecting them
            with qualified lawyers who can meet their specific needs.
          </h3>
          <h6>Get Paid for evey appointment</h6>
          <div className="buttons">
            <button
              onClick={() => navigate("/lawyers")}
              className="main__action__btn"
            >
              {/* See More <KeyboardArrowDownIcon /> */}
              Explore Lawyers
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="main__action__btn btn__two"
            >
            
              Create Account
            </button>
          </div>
        </div>
        
      </header>
    </div>
  );
};

export default HeroSection;

import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Actions/userActions";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [showCategories, setShowCategories] = useState(false);
  let categories = [
    "General Practice",
    "Criminal",
    "Civil",
    "Taxation",
    "Banking and finance",
    "Family Law",
    "Cyber Crime",
  ];
  const navigate = useNavigate();
  return (
    <div className="n__navbar">
      <h1 className="n__logo" onClick={() => navigate("/")}>
        Lawyer&nbsp; <span>Services</span>
      </h1>
      <div className="n__menus">
        <h3 onClick={() => navigate("/")}>Home</h3>
        <h3 onClick={() => navigate("/lawyers")}>Lawyers</h3>
        <h3 onClick={() => setShowCategories(!showCategories)}>
         Categories
        </h3>
        {currentUser?.name && currentUser?.userType == "client" ? (
          <>
            <h3 onClick={() => navigate("/Appointments")}>Appointments</h3>
            <h3 onClick={() => navigate("/messages")}>Chat</h3>
          </>
        ) : (
          currentUser?.name &&
          currentUser?.userType == "lawyer" && (
            <h3 onClick={() => navigate("/dashboard")}>Dashboard</h3>
          )
        )}
      </div>
      <div className="n__login__options">
        {currentUser?.name ? (
          <>
            <Avatar src={currentUser?.profile}>
              {!currentUser?.profile && currentUser?.name[0]}
            </Avatar>
            <button className="n__login__btn" onClick={dispatch(logoutUser)}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="n__login__btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="n__signup__btn"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </>
        )}
      </div>
      {showCategories && (
        <div className="category__dropdown">
          <h1>Categories</h1>
          <div className="categories">
            {categories?.map((c) => (
              <h3
                onClick={() => {
                  setShowCategories(false);
                  navigate(`/lawyers/${c}`);
                }}
              >
                {c}
              </h3>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

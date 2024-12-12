import React, { useState, useEffect } from "react";
import Profile from "../../Pages/Profile/Profile2";
import "./Settings.css";

const ProfileSettings = ({ setActive }) => {
  return (
    <div className="profile__settings">
      {" "}
      <div>
        <Profile />
      </div>
      <button
        className="edit__profile__btn"
        onClick={() => setActive("edit__profile")}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileSettings;

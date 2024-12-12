import React from "react";
import "./BrowseByCategories.css";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DangerousIcon from "@mui/icons-material/Dangerous";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PaidIcon from "@mui/icons-material/Paid";
import PublicIcon from "@mui/icons-material/Public";

const BrowseByCategories = () => {
  const navigate = useNavigate();
  let categories = [
    "General Practice",
    "Criminal",
    "Civil",
    "Taxation",
    "Banking and finance",
    "Family Law",
    "Cyber Crime",
  ];
  return (
    <div className="browse__by__categories">
      <h1>All Categories of Lawyers</h1>
      <div className="categories__container">
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[0]}`);
          }}
        >
          <div className="icon__box one">
            <PeopleIcon />
          </div>
          <p>General Practice</p>
        </div>
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[1]}`);
          }}
        >
          <div className="icon__box two">
            <DangerousIcon />
          </div>
          <p>Criminal</p>
        </div>
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[2]}`);
          }}
        >
          <div className="icon__box three">
            <PublicIcon />
          </div>
          <p>Civil</p>
        </div>
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[3]}`);
          }}
        >
          <div className="icon__box four">
            <MenuBookIcon />
          </div>
          <p>Taxation</p>
        </div>
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[4]}`);
          }}
        >
          <div className="icon__box five">
            <PaidIcon />
          </div>
          <p>Banking and finance</p>
        </div>
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[5]}`);
          }}
        >
          <div className="icon__box six">
            <FamilyRestroomIcon />
          </div>
          <p>Family Law</p>
        </div>
        <div
          onClick={() => {
            navigate(`/lawyers/${categories[6]}`);
          }}
        >
          <div className="icon__box seven">
            <VpnLockIcon />
          </div>
          <p>Cyber Crime</p>
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategories;

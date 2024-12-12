import React, { useEffect, useState } from "react";
import "./LawyerDashboard.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Actions/userActions";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ForumIcon from "@mui/icons-material/Forum";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentContainer from "./ContentContainer";
import { useParams } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MessengerScreen from "../Messages/MessengerScreen";

const LawyerDashboard = () => {
  const params = useParams();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [SSM, setSSM] = useState("");
  const [unm, setUnm] = useState(0);
  const [r, setR] = useState(0);
  useEffect(() => {
    if (params?.sub_url) {
      setActive(params?.sub_url);
    } else {
      setActive("dashboard");
    }
  }, [params?.sub_url]);
  setTimeout(() => {
    setR(Math.ceil((Math.random() * 10) / 100));
  }, 3000);
  useEffect(() => {
    const un = localStorage.getItem("unreadMsgsCount")
      ? JSON.parse(localStorage.getItem("unreadMsgsCount"))
      : null;
    setUnm(un);
  }, [r, window.location.url]);

  return (
    <div className="lawyer__dashboard__page">
      <div className="menu__bar">
        <p onClick={() => navigate("/")}>
          <span>Lawyer &nbsp;</span> Services
        </p>
        <div className="menu__options">
          <IconButton onClick={() => navigate("/dashboard/chat")}>
            <ForumIcon />
            {unm > 0 ? <span className="unreadMsgCount">{unm}</span> : <></>}
            {console.log("unm", unm)}
          </IconButton>
          <IconButton onClick={() => setShowDropdown(!showDropdown)}>
            {showDropdown ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {showDropdown && (
            <div className="dropdown">
              <p onClick={() => (window.location.href = "/profile")}>
                {" "}
                <Avatar src={currentUser?.profile}>
                  {!currentUser?.profile && currentUser?.name[0]}
                </Avatar>
                Profile
              </p>
              <p onClick={dispatch(logoutUser)}>
                <LogoutIcon />
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex__wrapper">
        <div className="sidebar">
          <h2
            className={active == "dashboard" && "active"}
            onClick={() => navigate("/dashboard")}
          >
            <DashboardIcon />
            Dashboard
          </h2>
          <h2 onClick={() => setSSM("appointments")}>
            <EventNoteIcon />
            Appointments
            <ArrowDropDownIcon />
          </h2>
          {SSM == "appointments" && (
            <div className="sub__menus__sidebar">
              <h6
                className={active == "upcoming__appointments" && "active"}
                onClick={() => navigate("/dashboard/upcoming__appointments")}
              >
                Upcoming
              </h6>
              <h6
                className={active == "ongoing__appointments" && "active"}
                onClick={() => navigate("/dashboard/ongoing__appointments")}
              >
                Ongoing
              </h6>
              <h6
                className={active == "attended__appointments" && "active"}
                onClick={() => navigate("/dashboard/attended__appointments")}
              >
                Attended
              </h6>
              <h6
                className={active == "cancelled__appointments" && "active"}
                onClick={() => navigate("/dashboard/cancelled__appointments")}
              >
                Cancelled
              </h6>
            </div>
          )}

          <h2
            className={active == "chat" && "active"}
            style={{ position: "relative" }}
            onClick={() => {
              setUnm(0);
              navigate("/dashboard/chat");
            }}
          >
            <ForumIcon />
            Chat
            {unm > 0 ? <span className="unreadMsgCount">{unm}</span> : <></>}
          </h2>
          <h2 onClick={() => setSSM("analytics")}>
            <AnalyticsIcon />
            Analytics <ArrowDropDownIcon />
          </h2>
          {SSM == "analytics" && (
            <div className="sub__menus__sidebar">
              <h6
                className={active == "profile__analytics" && "active"}
                onClick={() => navigate("/dashboard/profile__analytics")}
              >
                Profile
              </h6>
              <h6
                className={active == "earning__analytics" && "active"}
                onClick={() => navigate("/dashboard/earning__analytics")}
              >
                Earning
              </h6>
            </div>
          )}

          <h2
            className={active == "reviews" && "active"}
            onClick={() => setActive("reviews")}
          >
            <RateReviewIcon />
            Reviews
          </h2>
          <h2 onClick={() => setSSM("settings")}>
            <SettingsIcon />
            Settings <ArrowDropDownIcon />
          </h2>
          {SSM == "settings" && (
            <div className="sub__menus__sidebar">
              <h6
                className={active == "account__settings" && "active"}
                onClick={() => navigate("/dashboard/account__settings")}
              >
                Account
              </h6>
              <h6
                className={active == "profile__settings" && "active"}
                onClick={() => navigate("/dashboard/profile__settings")}
              >
                Profile
              </h6>
            </div>
          )}
        </div>
        <ContentContainer active={active} setActive={setActive} />
      </div>
      <div
        style={{
          width: "1px",
          height: "1px",
          opacity: "0",
          position: "absolute",
          top: "-200vh",
          width: "-200vw",
        }}
      >
        <MessengerScreen />
      </div>
    </div>
  );
};

export default LawyerDashboard;

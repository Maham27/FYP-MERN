import React from "react";
import "./Dashboard.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = ({ setActive, active }) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  return (
    <div className="dashboard">
      <div className="host__raffle__dashboard">
        <h2>Appointments</h2>
        {/* <Link to="/appointments/create">
          <h6
            onClick={() => setActive("create")}
            className={active === "create" && "active"}
          >
            Create New{" "}
          </h6>
        </Link> */}
        <Link to="/appointments/upcoming">
          <h6
            onClick={() => setActive("upcoming")}
            className={active === "upcoming" && "active"}
          >
            Upcoming
          </h6>
        </Link>
        <Link to="/appointments/ongoing">
          <h6
            onClick={() => setActive("ongoing")}
            className={active === "ongpoing" && "active"}
          >
            Ongoing
          </h6>
        </Link>
        {currentUser?.userType == "client" && (
          <Link to="/appointments/pending">
            <h6
              onClick={() => setActive("pending")}
              className={active === "pending" && "active"}
            >
              Pending
            </h6>
          </Link>
        )}

        <Link to="/appointments/attended">
          <h6
            onClick={() => setActive("attended")}
            className={active === "attended" && "active"}
          >
            Attended
          </h6>
        </Link>
        <Link to="/appointments/cancelled">
          <h6
            onClick={() => setActive("cancelled")}
            className={active === "cancelled" && "active"}
          >
            Cancelled
          </h6>
        </Link>
      </div>
      <div className="dashboard__footer">
        <div className="nav__links">
          <Link to="/" onClick={() => console.log("clicked")}>
            Home
          </Link>
          <Link to="/messages">Messages</Link>
          <Link to="/account">Account</Link>
          {/* <Link to="/about">About</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/faqs">FAQs</Link> */}
        </div>
        {/* <div className="social__links">
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
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;

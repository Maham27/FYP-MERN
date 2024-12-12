import React, { useEffect, useState } from "react";
import UpcomingAppointments from "../../Components/UpcomingAppointments/UpcomingAppointments";
import OngoingAppointments from "../../Components/OngoingAppointment/OngoingAppointment";
import AttendedAppointments from "../../Components/AttendedAppointments/AttendedAppointments";
import CancelledAppointments from "../../Components/CancelledAppointments/CancelledAppointments";
import DashboardInterface from "./DashboardInterface";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { addCreateConvMembers } from "../../Actions/messengerActions";
import { useNavigate, Link } from "react-router-dom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Account from "../Account/Account";
import ProfileSettings from "../../Components/Settings/ProfileSettings";
import ProfileAnalytics from "../../Components/Analytics/ProfileAnalytics";
import EarningAnalytics from "../../Components/Analytics/EarningAnalytics";
import CompleteProfileInformation from "../CompleteProfileInformation/CompleteProfileInformation2";
import StarIcon from "@mui/icons-material/Star";
import MessengerScreen from "../../Pages/Messages/MessengerScreen";

const ContentContainer = ({ active, setActive }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("active", active);
  }, [active]);

  return (
    <div className="content__container">
      {active == "ongoing__appointments" ? (
        <OngoingAppointments />
      ) : active == "upcoming__appointments" ? (
        <UpcomingAppointments />
      ) : active == "attended__appointments" ? (
        <AttendedAppointments />
      ) : active == "cancelled__appointments" ? (
        <CancelledAppointments />
      ) : active == "dashboard" ? (
        <DashboardInterface />
      ) : active == "reviews" ? (
        <Reviews />
      ) : active == "account__settings" ? (
        <Account />
      ) : active == "profile__settings" ? (
        <ProfileSettings setActive={setActive} />
      ) : active == "profile__analytics" ? (
        <ProfileAnalytics />
      ) : active == "earning__analytics" ? (
        <EarningAnalytics />
      ) : active == "edit__profile" ? (
        <CompleteProfileInformation isEditing={true} />
      ) : active == "chat" ? (
        <MessengerScreen isLawyer={true} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContentContainer;
const Reviews = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get(`/review/all-reviews/${currentUser?.id}`)
      .then((res) => {
        console.log("reviews>", res.data);
        setReviews(res.data);
      })
      .catch((err) => console.log);
  }, []);
  return (
    <div className="reviews">
      <div className="comment__box">
        <h1 className="heading">Reviews ({reviews?.length})</h1>

        <div className="comments">
          {reviews?.length > 0 ? (
            reviews.map((review) => (
              <div className="review">
                <h4>{review?.review}</h4>
                <h4>
                  {Array(parseInt(review?.rating))
                    .fill()
                    .map((_, i) => (
                      <span>
                        <StarIcon />
                      </span>
                    ))}
                  <span>({review?.rating})</span>
                </h4>
                <p>By {review?.client.name}</p>
                <span>{format(review?.createdAt)}</span>
                <button
                  className="chat__btn"
                  onClick={(e) => {
                    // navigate(`/messages/${lawyer?._id}`);
                    navigate(`/messages`);
                    dispatch(
                      addCreateConvMembers(
                        review?.client?.name,
                        review?.clientId
                      )
                    );
                  }}
                >
                  chat&nbsp; <ChatBubbleIcon />
                </button>
              </div>
            ))
          ) : (
            <h1>No reviews.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

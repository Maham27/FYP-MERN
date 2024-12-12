import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Avatar } from "@mui/material";
import { Navigate, useavigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { addCreateConvMembers } from "../../Actions/messengerActions";
import api from "../../utils/api";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MessageIcon from "@mui/icons-material/Message";

const Lawyer = ({ lawyer }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const dispatch = useDispatch();
  // console.log("individual lawyer>>>>>>>>>>>>>>", lawyer);
  useEffect(() => {
    api
      .get(`/review/all-reviews/${lawyer._id}`)
      .then((res) => {
        // console.log("res.data", res.data);
        if (res.data.length > 0) {
          let reviews = res.data;
          let count = 0;
          let total = 0;
          let array = [];
          reviews.forEach((review) => {
            count++;
            total = total + review.rating;
          });
          let ratingTemp = parseInt(total / count);
          setRating(ratingTemp);
          setRatingCount(count);
        }
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    // <div className="lawyer__card">
    //   <img
    //     className="profile__pic"
    //     src={
    //       lawyer?.profile
    //         ? lawyer?.profile
    //         : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
    //     }
    //   />
    //   <h1 className="name">{lawyer?.name}</h1>
    //   <h1 className="qualification">{lawyer?.qualification}</h1>
    //   <div className="rating__container">
    //     {rating == 0 ? (
    //       <p>no rating given</p>
    //     ) : (
    //       <>
    //         {" "}
    //         {Array(parseInt(rating))
    //           .fill()
    //           .map((_, i) => (
    //             <span>
    //               <StarIcon />
    //             </span>
    //           ))}
    //         <span>({ratingCount})</span>
    //       </>
    //     )}
    //   </div>
    //   <button
    //     className="appointment__btn"
    //     onClick={(e) => navigate(`/book-appointment/${lawyer?._id}`)}
    //   >
    //     Book Appointment
    //   </button>
    //   <button
    //     className="profile__btn"
    //     onClick={(e) => navigate(`/profile/${lawyer?._id}`)}
    //   >
    //     Visit Profile
    //   </button>
    //   <button
    //     className="message__btn"
    //     onClick={(e) => {
    //       // navigate(`/messages/${lawyer?._id}`);
    //       navigate(`/messages`);
    //       dispatch(addCreateConvMembers(lawyer?.name, lawyer?._id));
    //     }}
    //   >
    //     Contact Lawyer
    //   </button>
    // </div>
    <div className="lawyer__card">
      <div
        className="profile__pic"
        onClick={(e) => navigate(`/profile/${lawyer?._id}`)}
      >
        <img
          className="profile__pic"
          src={
            lawyer?.profile
              ? lawyer?.profile
              : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
          }
        />
      </div>

      <div
        className="personal__info"
        onClick={(e) => navigate(`/profile/${lawyer?._id}`)}
      >
        <div className="name__and__rating">
          <h1 className="name">{lawyer?.name}</h1>
          <div className="rating__container">
            {rating == 0 ? (
              <p>(no rating given)</p>
            ) : (
              <>
                {" "}
                {Array(parseInt(rating))
                  .fill()
                  .map((_, i) => (
                    <span>
                      <StarIcon />
                    </span>
                  ))}
                <span>({ratingCount})</span>
              </>
            )}
          </div>
        </div>
        <p className="education">
          {lawyer?.professionalInfo?.educations.map((edu, i) => (
            <>
              {i > 0 && ","}{" "}
              <>
                {`
                ${edu?.title} (${edu?.institution})`}
              </>
            </>
          ))}
        </p>
        <p className="areas__of__practices">
          Practiced in
          {lawyer?.personalInfo?.areasOfPractice.map((area, i) => (
            <>
              {i > 0 && ","} <>{area}</>
            </>
          ))}
        </p>
        <p className="bio">{lawyer?.personalInfo?.bio}</p>
      </div>
      <div className="action__buttons">
        <button
          className="appointment__btn"
          onClick={(e) => navigate(`/book-appointment/${lawyer?._id}`)}
        >
          <EventNoteIcon />
          Book Appointment
        </button>
        {/* <button
          className="profile__btn"
          onClick={(e) => navigate(`/profile/${lawyer?._id}`)}
        >
          Visit Profile
        </button> */}
        <button
          className="message__btn"
          onClick={(e) => {
            // navigate(`/messages/${lawyer?._id}`);
            navigate(`/messages`);
            dispatch(addCreateConvMembers(lawyer?.name, lawyer?._id));
          }}
        >
          <MessageIcon />
          Contact Lawyer
        </button>
      </div>
    </div>
  );
};

export default Lawyer;

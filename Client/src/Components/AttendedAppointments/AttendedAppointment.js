import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import RatingAndReview from "../RatingAndReviewModal/RatingAndReview";
import api from "../../utils/api";

const AttendedAppointment = ({ appointment, currentUser }) => {
  const navigate = useNavigate();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  useEffect(() => {
    console.log("is Reviewed>", appointment.isReviewed);
    if (appointment?.isReviewed) {
      api
        .get(`/review/${appointment._id}`)
        .then((res) => {
          // console.log("get reviews", res.data);
          setRating(res?.data?.rating);
          setReview(res?.data?.review);
        })
        .catch((err) => alert(err.message));
    }
  }, []);
  return (
    <div className="attended__appointment">
      <div className="row__one">
        <div className="lawyer__info">
          <img
            src={
              currentUser.userType == "lawyer"
                ? appointment.client.profile
                  ? appointment.client.profile
                  : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                : appointment.lawyer.profile
            }
          />
          <h3>
            {currentUser.userType == "client"
              ? appointment.lawyer.name
              : appointment.client.name}
          </h3>
          {/* <h5>
                    {currentUser?.userType == "client"
                      ? "(Lawyer)"
                      : "(Client)"}
                  </h5> */}
        </div>
        <div className="appointment__info">
          <span className="label">Appointment Title </span>
          <h6>{appointment.title}</h6>
          <span className="label">Description</span>
          <h6>{appointment.description}</h6>
        </div>
      </div>

      <div className="row__two">
        <div>
          <span className="label">Video Duration : 25 minutes </span>
        </div>
        <div>
          <span className="label">
            {appointment?.appointmentDate &&
              new Date(appointment?.appointmentDate).toDateString()}
          </span>
        </div>
      </div>
      <div className="row__three">
        <div className="review__box">
          {currentUser.userType == "lawyer" ? (
            <>
              <h1>User Rating</h1>
              <div className="rating">
                {rating ? (
                  <>
                    <>
                      {" "}
                      {Array(rating)
                        .fill()
                        .map((_, i) => (
                          <span>
                            <StarIcon />
                          </span>
                        ))}
                      <span>({rating})</span>
                    </>

                    <h1 style={{ marginTop: "1.2vh" }}>{review}</h1>
                  </>
                ) : (
                  <p>not rated yet</p>
                )}
              </div>
              <br />

              {/* <h1>Review</h1>
              {review ? <p>{review}</p> : <p>no review given</p>} */}
            </>
          ) : (
            <div>
              {" "}
              {appointment.isReviewed == true ? (
                <h1>Review Given.</h1>
              ) : (
                <button
                  className="rating__btn"
                  onClick={() => setShowRatingModal(true)}
                >
                  {console.log("reveiw given>>> ", appointment.isReviewed)}
                  Give a review!
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showRatingModal && (
        <RatingAndReview
          setShowRatingModal={setShowRatingModal}
          appointment={appointment}
        />
      )}
    </div>
  );
};

export default AttendedAppointment;

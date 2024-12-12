import React, { useContext, useEffect, useState } from "react";
import "./RatingAndReview.css";
import StarIcon from "@mui/icons-material/Star";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function RatingAndReview({ setShowRatingModal, appointment }) {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const navigate = useNavigate();
  const [rating, setRating] = useState(1);
  const [professionalism, setProfessionalism] = useState(1);
  const [communication, setCommunication] = useState(1);
  const [behaviour, setBehaviour] = useState(1);
  const [satisfaction, setSatisfaction] = useState(1);
  const [review, setReview] = useState("");
  const [lawyerId, setLawyerId] = useState(appointment.lawyerId);
  const [appointmentId, setAppointmentId] = useState(appointment._id);

  const submitReviewAndRatingForm = () => {
    console.log("rating and review>>>", rating, review);

    if (review === "") {
      alert("enter review before submission");
      return;
    }
    const body = {
      appointmentId: appointmentId,
      clientId: currentUser.id,
      client: currentUser,
      lawyer: appointment.lawyer,
      lawyerId: lawyerId,
      rating: parseInt(
        (professionalism + communication + behaviour + satisfaction) / 4
      ),
      review,
      professionalism,
      communication,
      behaviour,
      satisfaction,
    };
    // console.log("review body>>> ", body);
    api
      .post("/review", body)
      .then((res) => {
        // console.log("posting review result >>> ", res.data);
        //setting appointment rating

        const data = {
          appointmentId: appointmentId,
        };
        api
          .put(`/appointment/updateReviewStatus`, data)
          .then((res) => console.log("updating appointment rating", res.data))
          .catch((err) => console.log(err));

        window.location.reload();
      })
      .catch((err) => alert("review posting unsuccessful"));
  };
  return (
    <div className="rating__and__review__modal">
      <div className="rating__and__review__wrapper">
        <button
          onClick={() => setShowRatingModal(false)}
          className="skip__button"
        >
          {"skip >>"}{" "}
        </button>
        <div className="rating__wrapper">
          <h1>
            Rate how was your experience with the Lawyer
            {/* <span> {doctorInfo?.name}</span>. */}
          </h1>
          <div className="rating__stars">
            <p>Professional Skills</p> &nbsp;
            <span
              onClick={() => setProfessionalism(1)}
              className={
                (professionalism === 1 && "shine") ||
                (professionalism === 2 && "shine") ||
                (professionalism === 3 && "shine") ||
                (professionalism === 4 && "shine") ||
                (professionalism === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setProfessionalism(2)}
              className={
                (professionalism === 2 && "shine") ||
                (professionalism === 3 && "shine") ||
                (professionalism === 4 && "shine") ||
                (professionalism === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setProfessionalism(3)}
              className={
                (professionalism === 3 && "shine") ||
                (professionalism === 4 && "shine") ||
                (professionalism === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setProfessionalism(4)}
              className={
                (professionalism === 4 && "shine") ||
                (professionalism === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setProfessionalism(5)}
              className={professionalism === 5 && "shine"}
            >
              <StarIcon />
            </span>
          </div>
          <div className="rating__stars">
            <p>Communication </p> &nbsp;
            <span
              onClick={() => setCommunication(1)}
              className={
                (communication === 1 && "shine") ||
                (communication === 2 && "shine") ||
                (communication === 3 && "shine") ||
                (communication === 4 && "shine") ||
                (communication === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setCommunication(2)}
              className={
                (communication === 2 && "shine") ||
                (communication === 3 && "shine") ||
                (communication === 4 && "shine") ||
                (communication === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setCommunication(3)}
              className={
                (communication === 3 && "shine") ||
                (communication === 4 && "shine") ||
                (communication === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setCommunication(4)}
              className={
                (communication === 4 && "shine") ||
                (communication === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setCommunication(5)}
              className={communication === 5 && "shine"}
            >
              <StarIcon />
            </span>
          </div>
          <div className="rating__stars">
            <p>Behaviour </p> &nbsp;
            <span
              onClick={() => setBehaviour(1)}
              className={
                (behaviour === 1 && "shine") ||
                (behaviour === 2 && "shine") ||
                (behaviour === 3 && "shine") ||
                (behaviour === 4 && "shine") ||
                (behaviour === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setBehaviour(2)}
              className={
                (behaviour === 2 && "shine") ||
                (behaviour === 3 && "shine") ||
                (behaviour === 4 && "shine") ||
                (behaviour === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setBehaviour(3)}
              className={
                (behaviour === 3 && "shine") ||
                (behaviour === 4 && "shine") ||
                (behaviour === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setBehaviour(4)}
              className={
                (behaviour === 4 && "shine") || (behaviour === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setBehaviour(5)}
              className={behaviour === 5 && "shine"}
            >
              <StarIcon />
            </span>
          </div>
          <div className="rating__stars">
            <p>Satisfaction </p> &nbsp;
            <span
              onClick={() => setSatisfaction(1)}
              className={
                (satisfaction === 1 && "shine") ||
                (satisfaction === 2 && "shine") ||
                (satisfaction === 3 && "shine") ||
                (satisfaction === 4 && "shine") ||
                (satisfaction === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setSatisfaction(2)}
              className={
                (satisfaction === 2 && "shine") ||
                (satisfaction === 3 && "shine") ||
                (satisfaction === 4 && "shine") ||
                (satisfaction === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setSatisfaction(3)}
              className={
                (satisfaction === 3 && "shine") ||
                (satisfaction === 4 && "shine") ||
                (satisfaction === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setSatisfaction(4)}
              className={
                (satisfaction === 4 && "shine") ||
                (satisfaction === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setSatisfaction(5)}
              className={satisfaction === 5 && "shine"}
            >
              <StarIcon />
            </span>
          </div>
        </div>
        <div className="review__wrapper">
          <h1>Give a review</h1>
          <input
            type="text"
            placeholder="leave a comment here ..."
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={submitReviewAndRatingForm}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default RatingAndReview;

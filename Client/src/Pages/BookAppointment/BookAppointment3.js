import React, { useState, useEffect } from "react";
import "./BookAppointment3.css";
import { Form, Button, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import {
  bookAppointmentAction,
  validateBookingValues,
} from "../../Actions/bookAppointmentAction";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import Swal from "sweetalert2";
import StarIcon from "@mui/icons-material/Star";
import Reviews from "../../Components/Reviews/Reviews";
import BookApptimeSlots from "../../Components/BookAppTimeSlots/BookAppTimeSlots";
import Navbar from "../Home/Navbar";

const BookAppointment3 = () => {
  const [lawyer, setLawyer] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    let id = params?.lawyerId;
    if (id) {
      api
        .get(`/user/getUserById/${id}`)
        .then((res) => {
          console.log("lawyer", res.data);
          if (res.data) {
            setLawyer(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [params.lawyerId]);
  useEffect(() => {
    let id = params.lawyerId
      ? params.lawyerId
      : currentUser.id
      ? currentUser.id
      : currentUser._id;
    api
      .get(`/user/getUserById/${id}`)
      .then((res) => {
        setLawyer(res.data);
        console.log("lawyer", res.data);
      })
      .catch((error) => console.error(error));
    //setting reviews
    api
      .get(
        `/review/all-reviews/${
          params.lawyerId ? params.lawyerId : currentUser.id
        }`
      )
      .then((res) => {
        console.log("res.data", res.data);
        if (res.data.length > 0) {
          let reviews = res.data;
          let count = 0;
          let total = 0;
          let array = [];
          reviews.forEach((review) => {
            count++;
            total = total + review.rating;
            array.push(review);
          });
          let ratingTemp = parseInt(total / count);
          setRating(ratingTemp);
          setRatingCount(count);
          setReviews(array);
        }
      })
      .catch((err) => alert(err.message));
  }, [params.lawyerId]);
  useEffect(() => {
    // console.log("lawyer>>> ", lawyer);
  }, [lawyer]);
  return (
    <div className="body__wrapper">
      <Navbar />
      <div className="book__appointment__page">
        <div className="basic__info">
          <div className="profile__pic">
            <img
              className="profile__pic"
              src={
                lawyer?.profile
                  ? lawyer?.profile
                  : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
              }
            />
          </div>

          <div className="personal__info">
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
            <h6>Online video Consultation</h6>
            <h6>Fee: {lawyer?.appointmentFee} RS</h6>
          </div>
        </div>
        <div className="book__appointment__time__slots__container">
          <BookApptimeSlots lawyer={lawyer} />
        </div>
        <div className="reviews__container">
          <Reviews reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment3;

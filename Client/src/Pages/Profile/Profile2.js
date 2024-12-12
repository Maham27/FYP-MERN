import React, { useState, useEffect } from "react";
import "./Profile2.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import EventNoteIcon from "@mui/icons-material/EventNote";
import NNavbar from "../Home/Navbar";

const Profile2 = () => {
  const params = useParams();

  const [lawyer, setLawyer] = useState();
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  // useEffect(() => {
  //   api
  //     .get("/users/getUserBy?userId=" + user?.id)
  //     .then((res) => {
  //       user.picture = res.data[0].picture;
  //       user.approvalStatus = res.data[0].approvalStatus;

  //       if (res.data[0].approvalStatus === "pending") {
  //         navigate("/pending-application");
  //       } else {
  //         user.userRole === "1"
  //           ? navigate(`/profile/${params.doctorId}`)
  //           : navigate("/profile");
  //       }
  //       // console.log(user.picture);
  //     })
  //     .catch((error) => console.error(error));
  //   console.log("user>>>>> ", user);
  // }, []);
  useEffect(() => {
    console.log("running......................................", params);

    api
      .put(`/user/updateProfileViews/${params?.lawyerId}`)
      .then((res) =>
        console.log("jsbjsbmc>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.data)
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log("hakuna id");
    let id = params.lawyerId
      ? params.lawyerId
      : currentUser.id
      ? currentUser.id
      : currentUser._id;
    console.log("hakuna id", id);
    api
      .get(`/user/getUserById/${id}`)
      .then((res) => {
        setLawyer(res.data);
        console.log("matata lawyer", res.data);
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
  }, []);

  console.log("reviews>>>>>", reviews);
  // console.log("user", user);
  // console.log("doctor", doctor);
  useEffect(() => {
    console.log("lawyer at profile>>", lawyer);
  }, [lawyer]);
  return (
    <>
      <NNavbar />

      <div className="card">
        <div className="card-body">
          <div className="info">
            <div
              className="card-img-top"
              onClick={(e) => {
                if (currentUser?.userType == "client") {
                  navigate(`/profile/${lawyer?._id}`);
                }
              }}
            >
              <img
                className="img-fluid"
                src={
                  lawyer?.profile
                    ? lawyer?.profile
                    : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
                }
              />
            </div>

            <div
              className="info"
              onClick={(e) =>
                currentUser?.userType == "client" &&
                navigate(`/profile/${lawyer?._id}`)
              }
            >
              <div className="name__and__rating">
                <h3>{lawyer?.name}</h3>
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
              {/* <p className="education">
              {lawyer?.professionalInfo?.educations.map((edu, i) => (
                <>
                  {i > 0 && ","}{" "}
                  <>
                    {`
                ${edu?.title} (${edu?.institution})`}
                  </>
                </>
              ))}
            </p> */}
            </div>
          </div>
          <h5 className="card-title">
            Practiced in
            {lawyer?.personalInfo?.areasOfPractice.map((area, i) => (
              <>
                {i > 0 && ","} <>{area}</>
              </>
            ))}
          </h5>

          <div className="advance__info">
            <div className="info">
              <h5 className="card-title">Phone no: </h5>
              <p className="card-text">{lawyer?.personalInfo?.phone}</p>
            </div>
            <div className="info">
              <h5 className="card-title">City of Practice : </h5>
              <p>{lawyer?.personalInfo?.cityOfPractice}</p>
            </div>
            <div className="info">
              <h5 className="card-title">Office Address : </h5>
              <p>{lawyer?.personalInfo?.officeAddress}</p>
            </div>
            <div className="info">
              <h5 className="card-title">License Number :</h5>
              <p> {lawyer?.personalInfo?.licenseNumber}</p>
            </div>
            <div className="info">
              <h5 className="card-title">License Picture (frontside) </h5>
              <div className="card-img-top2">
                <img
                  src={lawyer?.personalInfo?.licensePicture}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="info">
              <h5 className="card-title">License Picture (backside) </h5>
              <div className="card-img-top2">
                <img
                  src={lawyer?.personalInfo?.licensePic}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="info">
              <h5 className="card-title">
                Upload your picture with the licensecard (for verification)
              </h5>
              <div className="card-img-top2">
                <img
                  src={lawyer?.personalInfo?.licenseUserPic}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="advance__info">
            <h3>Education :</h3>

            {lawyer?.professionalInfo?.educations.length > 0 ? (
              <>
                {lawyer?.professionalInfo?.educations.map((edu, idx) => (
                  <div>
                    <h5 className="card-title">{edu.title}</h5>
                    <p>
                      at {edu.institution} ({edu.startYear} - {edu.endYear})
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p>not mentioned.</p>
            )}
          </div>
          <div className="advance__info">
            <h3>Professional Experience :</h3>
            {lawyer?.professionalInfo?.experiences.length > 0 ? (
              <>
                {lawyer?.professionalInfo?.experiences.map((exp, idx) => (
                  <div>
                    <h5>{exp.title}</h5>
                    <p>
                      at {exp.firm} ({exp.startYear} - {exp.endYear})
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p>not mentioned.</p>
            )}
          </div>
          <div className="advance__info">
            <h3>Potfolio Cases :</h3>
            {lawyer?.professionalInfo?.portfolioItems.length > 0 ? (
              <>
                {lawyer?.professionalInfo?.portfolioItems.map((item, idx) => (
                  <div>
                    <h5>{item.title}</h5>
                    <p>from {item.description}</p>
                  </div>
                ))}
              </>
            ) : (
              <p>not provided.</p>
            )}
          </div>
          <div className="about">
            <h3>About :</h3>
            <p>{lawyer?.personalInfo?.bio}</p>
          </div>
        </div>
      </div>

      {window.location.pathname !== "/dashboard" && (
        <div className="reviews">
          <div className="comment__box">
            <h1 className="heading">Reviews ({reviews?.length})</h1>

            <div className="comments">
              {reviews?.length > 0 ? (
                reviews.map((review) => (
                  <div className="review">
                    <h4>{review?.review}</h4>
                    <p>By {review?.client.name}</p>
                    <span>{format(review?.createdAt)}</span>
                  </div>
                ))
              ) : (
                <h1>No reviews.</h1>
              )}
            </div>
          </div>
        </div>
      )}

      {params.lawyerId && (
        <div className="card2">
          <div className="card-body">
            <h3 className="card-title">Online Video Consultation</h3>
            <div>
              <h5>
                Fee
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{" "}
                {lawyer?.appointmentFee} RS
              </h5>
              <h5>Address :&nbsp; Use Phone/Laptop for video call</h5>
            </div>
            <button
              className="appointment__btn"
              onClick={(e) => navigate(`/book-appointment/${lawyer?._id}`)}
            >
              <EventNoteIcon />
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile2;

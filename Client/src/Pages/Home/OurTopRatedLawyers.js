import React, { useState, useEffect } from "react";
import "./OurTopRatedLawyers.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import api from "../../utils/api";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OurTopRatedLawyers = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    api
      .get("/user/lawyers")
      .then((res) => {
        console.log("carousel lawyers", res.data);
        setLawyers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="top__rated__lawyers">
      <h1>Our Lawyers </h1>
      <div>
        <Splide
          options={{
            rewind: true,
            width: 800,
            gap: "0.5rem",
            perPage: 3,
            interval: 5000,
            autoplay: "play",
            breakpoints: {
              760: {
                perPage: 3,
                interval: 3000,
              },
            },
          }}
        >
          {lawyers.length > 0 ? (
            lawyers.map((lawyer) => (
              <SplideSlide>
                <CarouselLawyer lawyer={lawyer} />
              </SplideSlide>
            ))
          ) : (
            <h6>no lawyers yet</h6>
          )}
        </Splide>
      </div>
    </div>
  );
};

export default OurTopRatedLawyers;
const CarouselLawyer = ({ lawyer }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  api
    .get(`/review/all-reviews/${lawyer?._id}`)
    .then((res) => {
      console.log("res.data", res.data);
      if (res.data.length > 0) {
        let reviews = res.data;
        let count = 0;
        let total = 0;

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
  return (
    <div className="carousel__lawyer__card">
      <img
        src={
          lawyer?.profile
            ? lawyer?.profile
            : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
        }
      />
      <div className="data">
        <h6>{lawyer?.name}</h6>
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
      <button onClick={() => navigate(`/profile/${lawyer?._id}`)}>
        view profile
      </button>
    </div>
  );
};

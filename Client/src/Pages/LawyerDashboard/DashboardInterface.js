import React, { useState, useEffect } from "react";
import "./DashboardInterface.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { getAttendedAppointments } from "../../Actions/appointmentActions";
import api from "../../utils/api";

const DashboardInterface = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [rating, setRating] = useState(0);
  const [earning, setEarning] = useState(0);
  const [completedTotal, setCT] = useState(0);
  const [views, setViews] = useState(0);
  const [professionalism, setProfessionalism] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [behaviour, setBehaviour] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  useEffect(async () => {
    let response = await getAttendedAppointments(currentUser.userType);
    if (response) {
      console.log(response);
      console.log("pendingAppointments>>", response);
      let total = 0;

      response.map((r) => {
        total = total + r?.lawyer?.appointmentFee;
      });
      setEarning(total);
      setCT(response?.length);
    }
    api
      .get(`/user/getUserById/${currentUser?.id}`)
      .then((res) => {
        console.log("data>>>>>>>>>>>>>>>>>>>>>", res.data);
        setViews(res.data?.profileViews ? res.data?.profileViews : 0);
      })
      .catch((error) => console.error(error));

    api
      .get(`/review/all-reviews/${currentUser?.id}`)
      .then((res) => {
        console.log("res.data reviews", res.data);
        if (res.data.length > 0) {
          let tr = 0,
            tb = 0,
            tc = 0,
            ts = 0,
            tp = 0;
          res.data.map((r) => {
            tr = tr + r?.rating;
            tb = tb + r?.behaviour;
            tp = tp + r?.professionalism;
            tc = tc + r?.communication;
            ts = ts + r?.satisfaction;
          });
          setRating(parseInt(tr / res.data?.length));
          setProfessionalism(parseInt(tp / res.data?.length));
          setSatisfaction(parseInt(ts / res.data?.length));
          setBehaviour(parseInt(tb / res.data?.length));
          setCommunication(parseInt(tc / res.data?.length));
        }
      })
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div className="dashboard__interface">
      <div className="flex__wrapper">
        <div className="total__views__box">
          <div className="icon__container">
            <RemoveRedEyeIcon />
          </div>
          <h6>Total Profile Views</h6>
          <h1>{views}</h1>
        </div>
        <div className="appointments__completed__box">
          <div className="icon__container">
            <AssignmentTurnedInIcon />
          </div>
          <h6>Total Appointments Completed</h6>
          <h1>{completedTotal}</h1>
        </div>
        <div className="total__earning__box">
          <div className="icon__container">
            <MonetizationOnIcon />
          </div>
          <h6>Total Earnings</h6>
          <h1>{earning} PKR</h1>
        </div>
      </div>
      <div className="rating__container">
        <div className="sub__container">
          <h2>Rating</h2>
          {rating == 0 ? (
            <p>(no rating given)</p>
          ) : (
            <>
              {Array(parseInt(rating))
                .fill()
                .map((_, i) => (
                  <span>
                    <StarIcon />
                  </span>
                ))}
              <span>({rating})</span>
            </>
          )}
        </div>
        <br /> <br />
        <div className="sub__container">
          <h2>Professional Skills</h2>
          {professionalism == 0 ? (
            <p>(no rating given)</p>
          ) : (
            <>
              {Array(parseInt(professionalism))
                .fill()
                .map((_, i) => (
                  <span>
                    <StarIcon />
                  </span>
                ))}
              <span>({professionalism})</span>
            </>
          )}
        </div>
        <div className="sub__container">
          <h2>Communication</h2>
          {communication == 0 ? (
            <p>(no rating given)</p>
          ) : (
            <>
              {Array(parseInt(communication))
                .fill()
                .map((_, i) => (
                  <span>
                    <StarIcon />
                  </span>
                ))}
              <span>({communication})</span>
            </>
          )}
        </div>
        <div className="sub__container">
          <h2>Behaviour</h2>
          {behaviour == 0 ? (
            <p>(no rating given)</p>
          ) : (
            <>
              {Array(parseInt(behaviour))
                .fill()
                .map((_, i) => (
                  <span>
                    <StarIcon />
                  </span>
                ))}
              <span>({behaviour})</span>
            </>
          )}
        </div>
        <div className="sub__container">
          <h2>Satisfaction</h2>
          {satisfaction == 0 ? (
            <p>(no rating given)</p>
          ) : (
            <>
              {Array(parseInt(satisfaction))
                .fill()
                .map((_, i) => (
                  <span>
                    <StarIcon />
                  </span>
                ))}
              <span>({satisfaction})</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardInterface;

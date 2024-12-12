import React, { useState, useEffect } from "react";
import "./OngoingAppointment.css";
import { getOngoingAppointment } from "../../Actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import OngoingAppointmentContainer from "./OngoingAppointmentContainer";

const OngoingAppointment = () => {
  const [appointment, setAppointment] = useState({});
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(async () => {
    let response = await getOngoingAppointment(currentUser?.userType);
    if (response) {
      setAppointment(response);
      console.log("ongoing appointment>>", response);
    } else {
      console.log("error while fetching appoitments", response);
    }
  }, []);
  return (
    <div className="ongoing__appointment">
      {appointment?._id ? (
        <>
          <h1 style={{ textAlign: "center" }} className="heading">
            Ongoing Appointment
          </h1>

          <OngoingAppointmentContainer appointment={appointment} />
        </>
      ) : (
        <h1 className="appointments__not__found__info">
          {" "}
          No Ongoing Appointment
        </h1>
      )}
    </div>
  );
};

export default OngoingAppointment;

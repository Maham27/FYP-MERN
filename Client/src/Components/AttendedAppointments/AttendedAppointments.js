import React, { useState, useEffect } from "react";
import "./AttendedAppointments.css";
import AttendedAppointment from "./AttendedAppointment";
import { getAttendedAppointments } from "../../Actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";

const AttendedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(async () => {
    let response = await getAttendedAppointments(currentUser.userType);
    if (response) {
      setAppointments(response);
      console.log("pendingAppointments>>", response);
    } else {
      alert("error while fetching appoitments");
    }
  }, []);
  return (
    <div className="attended__appointments">
      {appointments.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center" }} className="heading">
            Attended Appointments
          </h1>
          {appointments.map((appointment) => (
            <AttendedAppointment
              appointment={appointment}
              currentUser={currentUser}
            />
          ))}
        </>
      ) : (
        <h1 className="appointments__not__found__info">
          {" "}
          No Attended Appointments
        </h1>
      )}
    </div>
  );
};

export default AttendedAppointments;

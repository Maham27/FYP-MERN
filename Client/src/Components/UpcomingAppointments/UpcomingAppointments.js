import React, { useState, useEffect } from "react";
import "./UpcomingAppointments.css";
import { getUpcomingAppointments } from "../../Actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment } from "../../Actions/appointmentActions2";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { addCreateConvMembers } from "../../Actions/messengerActions";
import { useNavigate, Link } from "react-router-dom";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const UpcomingAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(async () => {
    let response = await getUpcomingAppointments(currentUser?.userType);
    if (response) {
      setAppointments(response);
      response.map((d) => {
        if (
          new Date(d?.appointmentDate).setHours(0, 0, 0, 0) <
          new Date().setHours(0, 0, 0, 0)
        ) {
          cancelAppointment(d?._id, navigate, currentUser);
        }
      });
      console.log("upcomingAppointments>>", response);
    } else {
      alert("error while fetching appoitments");
    }
  }, []);
  function dateDifference(date2, date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  return (
    <div className="upcoming__appointments">
      {appointments.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center" }} className="heading">
            Upcoming Appointments
          </h1>
          {appointments.map((appointment) => (
            <div className="upcoming__appointment">
              <p className="remaining__time">
                {dateDifference(
                  new Date(appointment?.appointmentDate),
                  new Date()
                )}{" "}
                Days Left
              </p>

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
                  <span className="label">Appointment Date </span>
                  <h6>
                    {new Date(appointment.appointmentDate).toDateString()}
                  </h6>
                </div>
                <div>
                  {" "}
                  <span className="label">Appointment Time </span>
                  <h6>{appointment.appointmentTime}</h6>
                </div>
              </div>
              <div className="row__three">
                <button
                  className="cancel__btn"
                  onClick={() =>
                    cancelAppointment(appointment._id, navigate, currentUser)
                  }
                >
                  Cancel&nbsp; <ClearIcon />
                </button>

                <button
                  className="chat__btn"
                  onClick={(e) => {
                    // navigate(`/messages/${lawyer?._id}`);
                    navigate(`/messages`);
                    dispatch(
                      addCreateConvMembers(
                        appointment?.client?.name,
                        appointment?.clientId
                      )
                    );
                  }}
                >
                  chat&nbsp; <ChatBubbleIcon />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h1 className="appointments__not__found__info">
          {" "}
          No Upcoming Appointments
        </h1>
      )}
    </div>
  );
};

export default UpcomingAppointments;

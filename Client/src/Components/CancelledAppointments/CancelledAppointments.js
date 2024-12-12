import React, { useState, useEffect } from "react";
import "./CancelledAppointments.css";
import { getCancelledAppointments } from "../../Actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CancelledAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(async () => {
    api
      .get(`/appointment/cancelled/${currentUser.userType}`)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log("error while fetching cancelled appointments ", err);
      });
  }, []);
  const deleteAppointment = async (id) => {
    try {
      const res = await api.delete(`/appointment/delete/${id}`);
      setAppointments(appointments.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="cancelled__appointments">
      {appointments.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center" }} className="heading">
            Cancelled Appointments
          </h1>
          {appointments.map((appointment) => (
            <div className="cancelled__appointment">
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
                <h5>
                  {currentUser?.userType == "client" ? "(Lawyer)" : "(Client)"}
                </h5>
                <div className="options">
                  <IconButton
                    onClick={() => deleteAppointment(appointment?._id)}
                  >
                    <Link to="#">
                      <DeleteForeverIcon />
                    </Link>
                  </IconButton>
                </div>
              </div>
              <div className="appointment__info">
                <span className="label">Appointment Title </span>
                <h6>{appointment.title}</h6>
                <span className="label">Description</span>
                <h6>{appointment.description}</h6>
                <span className="label">Appointment Date </span>
                <h6>{new Date(appointment.appointmentDate).toDateString()}</h6>
                <span className="label">Appointment Time </span>
                <h6>{appointment.appointmentTime}</h6>
                <span className="label">Status </span>
                <h6 style={{ color: "red" }}>Cancelled</h6>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h1 className="appointments__not__found__info">
          {" "}
          No Cancelled Appointments
        </h1>
      )}
    </div>
  );
};

export default CancelledAppointments;

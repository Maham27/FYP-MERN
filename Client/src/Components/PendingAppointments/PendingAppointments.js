import React, { useState, useEffect } from "react";
import "./PendingAppointments.css";
import { getPendingAppointments } from "../../Actions/appointmentActions";
import PendingAppointment from "./PendingAppointment";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(async () => {
    let response = await getPendingAppointments();
    if (response) {
      setAppointments(response);
      console.log("pendingAppointments>>", response);
    } else {
      alert("error while fetching appoitments");
    }
  }, []);
  return (
    <div className="pending__appointments">
      {appointments.length > 0 ? (
        <>
          <h1 style={{ textAlign: "center" }} className="heading">
            Pending Appointments
          </h1>
          {appointments.map((appointment) => (
            <PendingAppointment appointment={appointment} />
          ))}
        </>
      ) : (
        <h1 className="appointments__not__found__info">
          {" "}
          No Pending Appointments
        </h1>
      )}
    </div>
  );
};

export default PendingAppointments;

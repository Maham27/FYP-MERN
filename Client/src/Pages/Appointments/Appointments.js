import React, { useState, useEffect } from "react";
import "./Appointments.css";
import Dashboard from "../../Components/Dashboard/Dashboard";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import PendingAppointments from "../../Components/PendingAppointments/PendingAppointments";
import UpcomingAppointments from "../../Components/UpcomingAppointments/UpcomingAppointments";
import OngoingAppointments from "../../Components/OngoingAppointment/OngoingAppointment";
import AttendedAppointments from "../../Components/AttendedAppointments/AttendedAppointments";
import CancelledAppointments from "../../Components/CancelledAppointments/CancelledAppointments";
import NNavbar from "../Home/Navbar";

const Appointments = () => {
  const { subCategory } = useParams();
  const [active, setActive] = useState("upcoming");
  const [loading, showLoading] = useState(true);
  useEffect(() => {
    if (subCategory) {
      console.log("subcategory>>> ", subCategory);
      setActive(subCategory);
    } else {
      setActive("upcoming");
    }
    setTimeout(() => {
      console.log("subCategory>", active);
    }, 2000);
  }, [window.location.pathname]);
  return (
      <>
      <NNavbar />
      <div className="appointments">
        <Dashboard setActive={setActive} active={active} />
        {active == "ongoing" ? (
          <OngoingAppointments />
        ) : active == "pending" ? (
          <PendingAppointments />
        ) : active == "upcoming" ? (
          <UpcomingAppointments />
        ) : active == "attended" ? (
          <AttendedAppointments />
        ) : active == "cancelled" ? (
          <CancelledAppointments />
        ) : active == "edit" ? (
          // <EditRaffle />
          <h1>EditRaffle</h1>
        ) : (
          <></>
        )}
      </div>
   </>
  );
};

export default Appointments;

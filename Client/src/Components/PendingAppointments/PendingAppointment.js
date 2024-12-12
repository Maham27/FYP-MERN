import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Form, Button, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { cancelAppointment } from "../../Actions/appointmentActions2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const PendingAppointment = ({ appointment }) => {
  const [showPurchaseModel, setShowPurchaseModel] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: appointment.title,
    price: appointment.lawyer.appointmentFee,
    productBy: appointment.lawyer.name,
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    api
      .post("/payment", body)
      .then((response) => {
        console.log("response ", response);
        api
          .put(`/appointment/confirm-appointment/${appointment._id}`)
          .then((res) => {
            if (res.data) {
              console.log("updated appointments", res.data);
              alert("appointment confirmed");
              navigate("/appointments/upcoming");
            }
          })
          .catch((err) => console.log(err));
        // const { status } = response;
        // console.log("Status ", status);
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fee Payment Failed, Try again later.",
          footer: "Try Again Later",
        });
      });
  };
  const confirm = () => {
    api
      .put(`/appointment/confirm-appointment/${appointment._id}`)
      .then((res) => {
        if (res.data) {
          console.log("updated appointments", res.data);
          alert("appointment confirmed");
          navigate("/appointments/upcoming");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="pending__appointment">
      <div className="lawyer__info">
        <img src={appointment.lawyer.profile} />
        <h3>{appointment.lawyer.name}</h3>
        <h4>(Lawyer)</h4>
        <div className="options">
          {/* <button onClick={() => cancelAppointment(appointment._id, navigate)}>
            Cancel Appointment
          </button>
          <button>
            <Link to={`/edit-appointment/${appointment._id}`}>
              Edit Appointment
            </Link>
          </button> */}
          <IconButton
            onClick={() => cancelAppointment(appointment._id, navigate)}
          >
            <Link to="#">
              <ClearIcon />
            </Link>
          </IconButton>
          <IconButton>
            {" "}
            <Link to={`/edit-appointment/${appointment._id}`}>
              <EditIcon />
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
        <h6>Pending</h6>
      </div>
      <div className="pay__fee ">
        <div className="stripe__container">
          <button
            className="purchase__btn"
            onClick={() => setShowPaymentModal(true)}
          >
            Pay Appointment Fee
          </button>
          {/* <StripeCheckout
            stripeKey={
              "pk_test_51KWmfGCB2vzWo8QiaYkjGd3W4IGK3NNm2HtbmwuKIE1SLlwoMYnW4cy7QrvsoCOIZPHDTwJzewpDKA0FIgyWBiqT00u5CfS14C"
            }
            token={makePayment}
            name={appointment.title}
            amount={appointment.lawyer.appointmentFee * 100}
            // shippingAddress
            // billingAddress
          >
            <button className="purchase__btn">Pay Appointment Fee</button>
          </StripeCheckout> */}
        </div>
      </div>
      {showPaymentModal && (
        <div className="payment__modal">
          <h3 className="label">Appointment Fee</h3>
          <h3 className="label">{appointment.lawyer.appointmentFee}</h3>
          <h3 className="label">Bank</h3>
          <h3 className="label">
            {appointment.lawyer?.bankAccountDetails?.bank}
          </h3>
          <h3 className="label">Account No.</h3>
          <h3 className="label">
            {appointment.lawyer?.bankAccountDetails?.bankAccount}
          </h3>
          <br />
          <h3 className="label">Have you Paid?</h3>
          <div className="stripe__container">
            <button className="purchase__btn" onClick={() => confirm()}>
              Yes
            </button>
            &nbsp;&nbsp;
            <button
              className="purchase__btn"
              onClick={() => setShowPaymentModal(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAppointment;

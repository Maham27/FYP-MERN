import React, { useState, useEffect } from "react";
import "./BookAppointment2.css";
import { Form, Button, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import {
  bookAppointmentAction,
  validateBookingValues,
} from "../../Actions/bookAppointmentAction";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import Swal from "sweetalert2";

const BookAppointment2 = () => {
  // const [errors, setErrors] = useState({
  //   title: "",
  //   description: "",
  //   date: "",
  //   time: "",
  // });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const [appointmentFee, setAppointmentFee] = useState(0);
  const [showPurchaseModel, setShowPurchaseModel] = useState(false);
  const [lawyer, setLawyer] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  useEffect(() => {
    let id = params?.lawyerId;
    if (id) {
      api
        .get(`/user/getUserById/${id}`)
        .then((res) => {
          console.log("lawyer", res.data);
          if (res.data) {
            setAppointmentFee(res.data.appointmentFee);
            setLawyer(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [params.lawyerId]);
  const saveAndContinue = async () => {
    // if (
    //   title &&
    //   description &&
    //   date &&
    //   time &&
    //   currentUser.id &&
    //   params.lawyerId
    // ) {
    const bookAppointmentValues = {
      title,
      description,
      appointmentDate: new Date(date).toDateString(),
      appointmentTime: time,
      clientId: currentUser?.id,
      lawyerId: params?.lawyerId,
      client: currentUser,
      lawyer: lawyer,
    };
    // setErrors(validateBookingValues(bookAppointmentValues));
    //validateBookingValues(bookAppointmentValues, setErrors, errors)
    let errrors = {};
    /**** valdating book appintment */

    let appointmentMinutes =
      parseInt(bookAppointmentValues.appointmentTime.slice(0, 2)) * 60 +
      parseInt(bookAppointmentValues.appointmentTime.slice(3, 5));
    let startAva = parseInt(
      bookAppointmentValues.lawyer.startAvailabilityHour?.slice(0, 2)
    );
    let endAva = parseInt(
      bookAppointmentValues.lawyer.endAvailabilityHour?.slice(0, 2)
    );
    if (
      bookAppointmentValues.appointmentMinutes <
        bookAppointmentValues.startAva * 60 ||
      bookAppointmentValues.appointmentMinutes >
        bookAppointmentValues.endAva * 60
    ) {
      errrors.time =
        "Lawyer is not available at that  Time. Please Choose another one.";
    }

    const date1 = new Date(bookAppointmentValues.appointmentDate);
    const date2 = new Date(Date.now());

    let timeNow = parseInt(new Date());
    let TimetoTest = parseInt(
      bookAppointmentValues.appointmentTime.slice(0, 2)
    );
    let timeNowInMinutes =
      parseInt(date2.getHours()) * 60 + parseInt(date2.getMinutes());
    let timeToTestMinutes =
      parseInt(bookAppointmentValues.appointmentTime.slice(0, 2)) * 60 +
      parseInt(bookAppointmentValues.appointmentTime.slice(3, 5));
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    console.log("timeNowInMinutes", timeNowInMinutes);
    console.log("timeToTestMinutes", timeToTestMinutes);
    console.log(
      "appointment minutes",
      bookAppointmentValues.appointmentMinutes
    );
    if (date1 < date2) {
      errrors.date = "Must select a correct date";
    } else if (date1 > date2) {
      //its ok
    } else if (timeToTestMinutes < timeNowInMinutes) {
      errrors.time = "Must select a correct time";
    }

    if (bookAppointmentValues.description === "") {
      errrors.description = "Must fill description field";
    }
    if (bookAppointmentValues.title === "") {
      errrors.title = "Must fill title field";
    }
    if (bookAppointmentValues.appointmentTime === "") {
      errrors.time = "Must fill time field";
    }
    if (bookAppointmentValues.appointmentDate === "") {
      errrors.time = "Must fill date field";
    }

    const body = {
      lawyerId: bookAppointmentValues.lawyerId,
      status: "Confirmed",
      date: date1,
    };
    api.post("/appointment/specificAppointments", body).then((res) => {
      console.log("lawyer all appointments>", res.data);
      if (res.data[0]) {
        let isLawyerFree = true;
        res.data.forEach((appointment, i) => {
          let appointmentTimeMinutes =
            parseInt(appointment.appointmentTime.slice(0, 2)) * 60 +
            parseInt(appointment.appointmentTime.slice(3, 5));

          if (
            appointmentTimeMinutes - appointmentMinutes < 30 &&
            appointmentTimeMinutes - appointmentMinutes > -30
          ) {
            isLawyerFree = false;
          }
        });

        if (isLawyerFree === false) {
          errrors.time =
            "Lawyer is not available at that  Time. Please Choose another one.";
        }
      } else {
        // handleSubmit("ok");
      }
    });
    setErrors(errrors);

    /*************** */

    console.log("errors >>> ", errors);
    // if (!errors.title && !errors.description && !errors.date && !errors.time)
    if (Object.keys(errrors).length === 0 && errrors.constructor === Object) {
      const res = await bookAppointmentAction(bookAppointmentValues);
      console.log("res>>>>>>>>>>>>>>>", res);
      if (res?.data) {
        alert("appointment booked succcessfully");
        navigate("/appointments/pending");
      } else {
        alert("appointment booking failed");
        setErrors({
          title: "",
          description: "",
          time: "",
          date: "",
        });
      }
    }
  };

  return (
    <div className="book__appointment__page" disabled>
      <div className="book__appointment__form">
        <Container>
          <Form>
            {/* <Form.Row> */}
            <h1>Book Appointment</h1>
            <Form.Group as={Col} controlId="title">
              <br />
              <Form.Label className="label">Appointment Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={title}
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="error__para">{errors.title}</p>}
            </Form.Group>

            <Form.Group as={Col} controlId="description">
              <br />
              <Form.Label className="label">Appointment Description</Form.Label>
              <Form.Control
                type="text"
                defaultValue={description}
                name="description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="error__para">{errors.description}</p>
              )}
            </Form.Group>
            {/* </Form.Row> */}

            <Form.Group as={Col} controlId="expiryDate">
              <br />
              <Form.Label className="label">Appointment Date</Form.Label>

              <div style={{ display: "flex", height: "50px" }}>
                <DatePicker
                  selected={date}
                  onChange={(date) => {
                    setDate(date);
                  }}
                />
              </div>
              {errors.date && <p className="error__para">{errors.date}</p>}
            </Form.Group>
            <Form.Group as={Col} controlId="appointmentTime">
              <br />
              <Form.Label
                className="label"
                style={{ display: "block", width: "100%" }}
              >
                Appointment Time
              </Form.Label>
              <TimePicker
                className="form__div__time__icon"
                value={time}
                onChange={setTime}
                clockIcon={null}
              />
              {errors.time && <p className="error__para">{errors.time}</p>}
            </Form.Group>

            <Button
              variant="primary"
              style={{ marginTop: "5vh" }}
              onClick={(e) => saveAndContinue(e)}
            >
              Book the Appointment
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default BookAppointment2;

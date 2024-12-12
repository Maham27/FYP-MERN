import React, { useState, useEffect } from "react";
import "./EditAppointment.css";
import { Form, Button, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import {
  updateAppointmentAction,
  validateBookingValues,
} from "../../Actions/bookAppointmentAction";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import Swal from "sweetalert2";

const BookAppointment2 = () => {
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [description, setDescription] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    if (appointment?.title) {
      setTitle(appointment.title);
      setDescription(appointment.description);
      setDate(new Date(appointment.appointmentDate));
      setTime(appointment.appointmentTime);
      console.log(
        "date>",
        appointment.appointmentDate,
        "time>",
        appointment.appointmentTime
      );
    }
  }, [appointment]);
  useEffect(() => {
    let id = params?.appointmentId;
    if (id) {
      api
        .get(`/appointment/getByAppointmentId/${id}`)
        .then((res) => {
          console.log("appointment", res.data);
          if (res.data) {
            setAppointment(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [params.appointmentId]);
  const saveAndContinue = async () => {
    // if (
    //   title &&
    //   description &&
    //   date &&
    //   time &&
    //   currentUser.id &&
    //   params.appointmentId
    // ) {
    const updateAppointmentValues = {
      id: appointment?._id,
      title,
      description,
      appointmentDate: new Date(date).toDateString(),
      appointmentTime: time,
      lawyerId: appointment.lawyerId,
      clientId: appointment.clientId,
      lawyer: appointment.lawyer,
      client: appointment.client,
    };
    await validateBookingValues(updateAppointmentValues, setErrors, errors);
    setTimeout(async () => {
      if (
        !errors.title &&
        !errors.description &&
        !errors.date &&
        !errors.time
      ) {
        console.log("updateAppointmentValues>>", updateAppointmentValues);
        const res = await updateAppointmentAction(updateAppointmentValues);
        console.log("res>>>>>>>>>>>>>>>", res);
        if (res?.data) {
          alert("appointment updated succcessfully");
          navigate("/appointments/pending");
        } else {
          alert("appointment updation failed");
        }
      }
    }, 1000);

    // } else {
    //   alert("some info is missig");
    // }

    // nextStep();
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
              {errors.expiryDate && (
                <p className="error__para">{errors.expiryDate}</p>
              )}
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
            </Form.Group>

            <Button
              variant="primary"
              style={{ marginTop: "5vh" }}
              onClick={(e) => saveAndContinue(e)}
            >
              Update Appointment
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default BookAppointment2;

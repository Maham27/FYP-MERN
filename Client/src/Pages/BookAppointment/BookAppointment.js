import React, { useState, useEffect } from "react";
import "./BookAppointment.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import axios from "axios";
// import { ErrorMessage } from "@hookform/error-message";
import LoadinIndicator from "../../Components/LoadingIndicator/LoadingIndicator";


const BookAppointment = ({ isEdit, appointmentId }) => {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm({ mode: "onChange" });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [description, setDescription] = useState("");

  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const params = useParams();

  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [errors, setErrors] = useState({});
  //console.log(user.id);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isEdit === true) {
  //     axios
  //       .get(
  //         "http://localhost:5000/api/appointment/getByAppointmentId/" +
  //           appointmentId
  //       )
  //       .then((res) => {
  //         if (res.data) {
  //           console.log("edit appointment >>> ", res.data);
  //           setTitle(res.data.title);
  //           setDate(res.data.appointmentDate);
  //           setTime(res.data.appointmentTime);
  //           setDescription(res.data.description);
  //         }
  //       })
  //       .catch((err) => console.log);
  //   }
  // }, [isEdit]);

  const validation = () => {
    // console.log("date>> ", date);
    // console.log("time>> ", time);
    setErrors({
      title: "",
      description: "",
      time: "",
      date: "",
    });
    //applying condition for time to be between 9 am to 6pm
    let appointmentMinutes =
      parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
    // if (appointmentMinutes < 9 * 60 || appointmentMinutes > 18 * 60) {
    //   handleSubmit("select time between 9 am to 6pm");
    //   return;
    // }

    const date1 = new Date(date);
    const date2 = new Date(Date.now());

    let timeNow = parseInt(new Date());
    let TimetoTest = parseInt(time.slice(0, 2));
    let timeNowInMinutes =
      parseInt(date2.getHours()) * 60 + parseInt(date2.getMinutes());
    let timeToTestMinutes =
      parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    console.log("timeNowInMinutes", timeNowInMinutes);
    console.log("timeToTestMinutes", timeToTestMinutes);
    console.log("appointment minutes", appointmentMinutes);
    if (date1 < date2) {
      setErrors({ date: "Must select a correct date" });
    } else if (date1 > date2) {
      //its ok
    } else if (timeToTestMinutes < timeNowInMinutes) {
      setErrors({ ...errors, time: "Must select a correct time" });
    }

    if (description === "") {
      setErrors({ ...errors, description: "Must fill description field" });
    }
    if (title === "") {
      setErrors({ ...errors, title: "Must fill title field" });
    }
    if (time === "") {
      setErrors({ ...errors, time: "Must fill time field" });
    }
    //checking availability of lawyer at given date and time
    const body = {
      lawyerId: params.lawyerId,
      status: "Confirmed",
      date: date1,
    };
    axios
      .post("http://localhost:5000/api/appointment/specificAppointments", body)
      .then((res) => {
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

          isLawyerFree === false &&
            setErrors({
              ...errors,
              time: "lawyer is not available at that  Time. Please Choose another one.",
            });
        } else {
          // handleSubmit("ok");
        }
      });
    setTimeout(() => {
      if (
        errors.time !== "" ||
        errors.date !== "" ||
        errors.title !== "" ||
        errors.description !== ""
      ) {
        console.log("errors>>> ", errors);
        return;
      } else {
        handleSubmit("ok");
      }
    }, 500);
  };

  const handleSubmit = async (validate) => {
    console.log("running handle submit");
    try {
      //const validate = validation();
      if (validate === "ok") {
        if (errors.time || errors.date || errors.title || errors.description) {
          return;
        }

        setDate(new Date(date));
        date.setHours(0, 0, 0, 0);
        setIsBookingAppointment(true);
        if (isEdit === true) {
          const appointment = {
            id: appointmentId,
            title: title,
            appointmentDate: date,
            appointmentTime: time,
            description: description,
          };
          const updated = await axios.put(
            "http://localhost:5000/api/appointment/updateAppointmentDetails",
            appointment
          );
          setIsBookingAppointment(false);
        } else {
          const appointment = {
            userId: currentUser.id,
            lawyerId: params.lawyerId,
            title: title,
            read: false,
            appointmentDate: date,
            appointmentTime: time,
            description: description,
          };
          const created = await axios.post(
            "http://localhost:5000/api/appointment",
            appointment
          );
          setIsBookingAppointment(false);
        }

        // console.log("appointment>>>>>>>>>>>>>", appointment);

        //send notification

        axios
          .post(`http://localhost:5000/api/notifications/`, {
            receiverId: params.lawyerId,
            text: `${currentUser.name} requested an appointment!.`,
            read: false,
          })
          .then((res) => {
            // console.log("send message notification>> ", res);
          })
          .catch((err) => {
            console.log(err);
          });

        /******************** */
        isEdit === true ? window.location.reload() : navigate("/dashboard");
      } else {
        alert(validate);
      }
    } catch (error) {
      console.log(error.message);
      setIsBookingAppointment(false);
    }
  };
  return (
    <div className="book__appointment__page">
      {isEdit !== true && (
        <>
          <div className="lower-navbar">
            <h5>Book Appointments</h5>
            <h6>Video consultaion with legal advisiors</h6>
          </div>
        </>
      )}

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          validation();
        }}
        autoComplete="off"
      >
        <div className="form__div">
          <h1>
            {" "}
            {isEdit === true
              ? "Edit an Appointment"
              : "Book an Appointment"}{" "}
          </h1>
          <label>Title</label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>

        <div className="form__div__date">
          <label>Select Date</label>
          <DatePicker
            className="form__div__date__input"
            value={date}
            onChange={setDate}
            calendarIcon={null}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
        </div>

        <div className="form__div__time">
          <label>Select Time</label>
          <TimePicker
            className="form__div__time__icon"
            value={time}
            onChange={setTime}
            clockIcon={null}
          />
          {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}
        </div>

        <div className="form__div">
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>

        <div className="form__div__button__container">
          {isBookingAppointment ? (
            <LoadinIndicator />
          ) : (
            <button
              type="submit"
              className="form__div__button"
              disable={isBookingAppointment === true ? true : false}
            >
              {isEdit === true ? "UPDATE" : "SUBMIT"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;

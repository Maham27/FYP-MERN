import React, { useState, useEffect } from "react";
import "./BookAppTimeSlots.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { bookAppointmentAction } from "../../Actions/bookAppointmentAction";

// import ReactTimeslotCalendar from "react-timeslot-calendar-k";
// import moment from "moment";

/*** timeout note */
//var timeout = new Date().getTime() + 15*60*1000; //add 15 minutes;

const ampmToMinutesConverter = (time) => {
  var input = time,
    matches = input.toLowerCase().match(/(\d{1,2}):(\d{2}) ([ap]m)/),
    output =
      parseInt(matches[1]) +
      (matches[3] == "pm" ? 12 : 0) +
      ":" +
      matches[2] +
      ":00";
  if (time == "12:00 PM") {
    output = "12:00:00";
  }
  if (time == "12:30 PM") {
    output = "12:30:00";
  }
  const hms = output;
  // console.log("output>", output);
  const [hours, minutes, seconds] = hms.split(":");
  // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  // console.log("hours miutes", hours, minutes);
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return totalMinutes;
};
const simpleToMinutes = (time) => {
  const hms = time;
  // console.log("output>", output);
  const [hours, minutes, seconds] = hms.split(":");
  // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  // console.log("hours miutes", hours, minutes);
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return totalMinutes;
};

const BookApptimeSlots = ({ lawyer }) => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [activeSlot, setActiveSlot] = useState("");
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM",
  ]);
  
  useEffect(() => {
    // console.log("date>", date);
    setDisabledSlots([...slots]);
    let date1 = date;
    let date2 = new Date();
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    // console.log("date1 and date2>", date1, date2);
    if (date1 < date2) {
      //remains same
    } else if (date1 > date2) {
      setDisabledSlots([]);
      let temp = [];

      const body = {
        lawyerId: lawyer?._id,
        status: "Confirmed",
        date: date1,
      };
      api.post("/appointment/specificAppointments", body).then((res) => {
        console.log("lawyer all appointments>", res.data);
        if (res.data[0]) {
          // console.log("appointments>>>", res.data);

          slots.map((slot) => {
            let isFound = false;
            res.data.map((app) => {
              if (slot == app.appointmentTime) {
                temp.push(slot);
                isFound = true;
              }
            });

            if (!isFound) {
              temp.push("");
            }
          });
          setDisabledSlots(temp);
        } else {
          // handleSubmit("ok");
          let a = 0;
          let b = 0;
          if (lawyer?.startAvailabilityTime && lawyer?.endAvailabilityTime) {
            a = simpleToMinutes(lawyer?.startAvailabilityTime);
            b = simpleToMinutes(lawyer?.endAvailabilityTime);
          }
          let temp22 = [];
          slots.forEach((slot) => {
            let exa = ampmToMinutesConverter(slot);
            
            console.log("example >>>>", exa, a, b);
            if (exa < a || exa > b) {
              temp22.push(slot);
            } else {
              temp22.push("");
            }
          });
          setDisabledSlots(temp22);
        }
      });
    } else if (new Date().getHours() <= 21) {
      let temp = [];
      let a = 0;
      let b = 0;
      if (lawyer?.startAvailabilityTime && lawyer?.endAvailabilityTime) {
        a = simpleToMinutes(lawyer?.startAvailabilityTime);
        b = simpleToMinutes(lawyer?.endAvailabilityTime);
      }
      slots.forEach((slot) => {
        let m1 =
          parseInt(new Date().getHours()) * 60 +
          parseInt(new Date().getMinutes());
        let m2 = ampmToMinutesConverter(slot);
        let exa = ampmToMinutesConverter(slot);
        console.log("example >>>>", exa, a, b);
        if (m2 < m1) {
          temp.push(slot);
        } else if (exa < a || exa > b) {
          temp.push(slot);
        } else {
          temp.push("");
        }
      });
      setDisabledSlots(temp);
    }
  }, [date]);

  const selectSlot = (e) => {
    setActiveSlot(e.target.value);
    setTime(e.target.value);
    setShowModal(true);
  };

  return (
    <div className="BookAppTimeSlots">
      <div className="date__selector__container">
        <lable>Select Date</lable>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
      <div className="time__selector__container">
        <lable>Select Time</lable>
        <div className="time__slots">
          {slots.map((slot, i) => (
            <input
              className={
                disabledSlots[i] == slot
                  ? "slot disabled"
                  : activeSlot == slot
                  ? "slot active"
                  : "slot"
              }
              value={slot}
              onClick={(e) => {
                if (disabledSlots[i] == slot) {
                  console.log("disabled");
                } else {
                  selectSlot(e);
                }
              }}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <BookAppointmentModal
          date={date}
          time={time}
          lawyer={lawyer}
          setShowModal={setShowModal}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

const BookAppointmentModal = ({
  date,
  time,
  lawyer,
  setShowModal,
  currentUser,
}) => {
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const bookAppointment = (e) => {
    e.preventDefault();
    let errrors = {};
    if (description === "") {
      errrors.description = "required";
    }
    if (title === "") {
      errrors.title = "required";
    }
    if (Object.keys(errrors).length === 0 && errrors.constructor === Object) {
      // alert("log in");
      date.setHours(0, 0, 0, 0);
      const bookAppointmentValues = {
        title,
        description,
        appointmentDate: date,
        appointmentTime: time,
        clientId: currentUser?.id,
        lawyerId: lawyer?._id,
        client: currentUser,
        lawyer: lawyer,
      };
      bookAppointmentAction(bookAppointmentValues);
    }
  };
  return (
    <div className="book__appointment__modal">
      <span onClick={() => setShowModal(false)}>
        <HighlightOffIcon />
      </span>
      <h1>Appointment with {lawyer?.name}</h1>
      <label>Appointment Date: {date?.toLocaleDateString()}</label>
      <label>Appointment Time: {time}</label>
      <label>Appointment Fee : {lawyer?.appointmentFee}</label>
      <label>Appointment Title</label>
      <input
        type="text"
        defaultValue={title}
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="error__para">{errors.title}</p>}

      <label className="label">Appointment Description</label>
      <input
        type="text"
        defaultValue={description}
        name="description"
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      {errors.description && (
        <p className="error__para">{errors.description}</p>
      )}
      <button
        className="book__appointment__btn"
        onClick={(e) => bookAppointment(e)}
      >
        Book Appointment
      </button>
    </div>
  );
};
export default BookApptimeSlots;

import api from "../utils/api";

export const getPendingAppointments = async () => {
  //console.log("at action=>", bookAppointmentValues);
  let response;
  await api
    .get("/appointment/pending")
    .then((res) => {
      console.log("pending appointments>", res);
      response = res.data;
    })
    .catch((err) => {
      console.log("error while fetching pending appointments ", err);
      response = {};
    });
  return response;
};

export const getUpcomingAppointments = async (userType) => {
  //console.log("at action=>", bookAppointmentValues);
  let response;
  await api
    .get(`/appointment/upcoming/${userType}`)
    .then((res) => {
      console.log("upcoming appointments>", res);
      response = res.data;
    })
    .catch((err) => {
      console.log("error while fetching upcoming appointments ", err);
      response = {};
    });
  return response;
};

export const getAttendedAppointments = async (userType) => {
  //console.log("at action=>", bookAppointmentValues);
  let response;
  await api
    .get(`/appointment/attended/${userType}`)
    .then((res) => {
      console.log("attended appointments>", res);
      response = res.data;
    })
    .catch((err) => {
      console.log("error while fetching attended appointments ", err);
      response = {};
    });
  return response;
};
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
export const getOngoingAppointment = async (userType) => {
  //console.log("at action=>", bookAppointmentValues);
  let currentDate = new Date(Date.now());
  currentDate.setHours(0, 0, 0, 0);
  const body = {
    date: currentDate,
  };
  let response;
  await api
    .post(`/appointment/today-specific/${userType}`, body)
    .then((res) => {
      console.log("todays appoinments>", res.data);
      let todaysAppointments = res.data;
      if (todaysAppointments.length > 0) {
        todaysAppointments.map((appointment) => {
          let time = appointment?.appointmentTime;
          let timeInMinutes = ampmToMinutesConverter(time);
          // parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
          let currentTimeInMinutes =
            parseInt(new Date().getHours()) * 60 +
            parseInt(new Date().getMinutes());
          //console.log("timeInMinutes", timeInMinutes);
          //console.log("currentTimeInMinutes", currentTimeInMinutes);

          if (
            currentTimeInMinutes >= timeInMinutes &&
            currentTimeInMinutes - timeInMinutes <= 30
          ) {
            response = appointment;
            console.log("testinggg", appointment);
          }
        });
      }
    })
    .catch((err) => {
      console.log("error while fetching upcoming appointments ", err);
      response = {};
    });
  return response;
};

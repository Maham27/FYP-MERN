import api from "../utils/api";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const bookAppointmentAction = async (bookAppointmentValues) => {
  //console.log("at action=>", bookAppointmentValues);
  let response;
  await api
    .post("/appointment/", bookAppointmentValues)
    .then((res) => {
      console.log("res of booking appointment>", res);
      response = res;
      Swal.fire("Booked Successfully!", "", "success");
      window.location.href = "/appointments/pending";
    })
    .catch((err) => {
      console.log("error while booking appointment", err);
      response = {};
      swalWithBootstrapButtons.fire(
        " Booking Unsuccessful!",
        "Something goes wrong",
        "error"
      );
    });
  return response;
};

export const updateAppointmentAction = async (updateAppointmentValues) => {
  //console.log("at action=>", bookAppointmentValues);
  let response;
  await api
    .put("/appointment/updateAppointmentDetails/", updateAppointmentValues)
    .then((res) => {
      console.log("res of updating appointment>", res);
      response = res;
    })
    .catch((err) => {
      console.log("error while updating appointment", err);
      response = {};
    });
  return response;
};

export const validateBookingValues = async (
  bookAppointmentValues,
  setErrors,
  errors
) => {
  const {
    title,
    description,
    appointmentDate,
    appointmentTime,
    lawyerId,
    clientId,
    lawyer,
  } = bookAppointmentValues;
  // let errors = {
  //   title: "",
  //   description: "",
  //   date: "",
  //   time: "",
  // };
  setErrors({
    title: "",
    description: "",
    time: "",
    date: "",
  });
  //applying condition for time to be between 9 am to 6pm
  let appointmentMinutes =
    parseInt(appointmentTime.slice(0, 2)) * 60 +
    parseInt(appointmentTime.slice(3, 5));
  // if (appointmentMinutes < 9 * 60 || appointmentMinutes > 18 * 60) {
  //   handleSubmit("select time between 9 am to 6pm");
  //   return;
  // }
  /*********** check according to lawyer availability */
  let startAva = parseInt(lawyer.startAvailabilityHour.slice(0, 2));
  let endAva = parseInt(lawyer.endAvailabilityHour.slice(0, 2));
  if (appointmentMinutes < startAva * 60 || appointmentMinutes > endAva * 60) {
    setErrors({
      ...errors,
      time: "Lawyer is not available at that  Time. Please Choose another one.",
    });
    return;
  }

  /********************************** */

  const date1 = new Date(appointmentDate);
  const date2 = new Date(Date.now());

  let timeNow = parseInt(new Date());
  let TimetoTest = parseInt(appointmentTime.slice(0, 2));
  let timeNowInMinutes =
    parseInt(date2.getHours()) * 60 + parseInt(date2.getMinutes());
  let timeToTestMinutes =
    parseInt(appointmentTime.slice(0, 2)) * 60 +
    parseInt(appointmentTime.slice(3, 5));
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  console.log("timeNowInMinutes", timeNowInMinutes);
  console.log("timeToTestMinutes", timeToTestMinutes);
  console.log("appointment minutes", appointmentMinutes);
  if (date1 < date2) {
    setErrors({ ...errors, date: "Must select a correct date" });
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
  if (appointmentTime === "") {
    setErrors({ ...errors, time: "Must fill time field" });
  }
  if (appointmentDate === "") {
    setErrors({ ...errors, time: "Must fill date field" });
  }
  //checking availability of doctor at given date and time
  const body = {
    lawyerId: lawyerId,
    status: "Confirmed",
    date: date1,
  };
  api.post("/appointment/specificAppointments", body).then((res) => {
    console.log("lawyer all appointments>", res.data);
    if (res.data[0]) {
      console.log("already booked appointments>>>", res.data);
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
          time: "Lawyer is not available at that  Time. Please Choose another one.",
        });
    } else {
      // handleSubmit("ok");
    }
  });

  return errors;
};

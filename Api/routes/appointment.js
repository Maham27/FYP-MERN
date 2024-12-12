const router = require("express").Router();
const { Appointment } = require("../models/Appointment");
const fetchuser = require("../middleware/fetchuser");
// create a new appointment in the database

router.post("/", fetchuser, async (req, res) => {
  try {
    //console.log(req.body);
    const appointment = await Appointment.create(req.body);
    // console.log("body of appointment:", appointment);
    return res.status(200).json(appointment);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});
//get appointment for specific doctor with specific Id
router.post("/specificAppointments", fetchuser, async (req, res) => {
  try {
    let filter = {
      lawyerId: req.body.lawyerId,
      status: req.body.status,
      appointmentDate: req.body.date,
    };

    // if (req.body.userId !== undefined) {
    //   filter = {
    //     userId: req.body.userId,
    //     status: req.body.status,
    //     appointmentDate: req.body.date,
    //   };
    // }
    // console.log("filter>>>>> ", filter);
    const appointments = await Appointment.find(filter);
    // console.log("appointments>>> appointment");
    return res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send("something went wrong.....");
  }
});
router.put("/update-seen-status/:appointmentId", async (req, res) => {
  try {
    const filter = { _id: req.params.appointmentId };
    const option = { $set: { isSeen: true } };
    // console.log("id>>> ", req.body.messageId);
    //console.log("isReceived>>>", req.body.isReceived);
    const app = await Appointment.findOneAndUpdate(filter, option);
    return res.status(200).json(app);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//get appointment by appointment id
router.get("/getByAppointmentId/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
    });
    res.status(200).json(appointment);
  } catch {
    res.status(500).send("internal server error...");
  }
});
//update appointment
router.put("/updateAppointmentDetails", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;
  const description = req.body.description;

  try {
    const filter = { _id: id };
    const option = { title, appointmentDate, appointmentTime, description };
    console.log("update app=> ", filter);
    const appointment = await Appointment.findOneAndUpdate(filter, option);

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//update review status
router.put("/updateReviewStatus", async (req, res) => {
  const id = req.body.appointmentId;
  console.log("running update review");
  try {
    const filter = { _id: id };
    const option = { isReviewed: true };
    console.log("update app=> ", filter);
    const appointment = await Appointment.findOneAndUpdate(filter, option);

    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//get all appointment by userId

router.post("/:userId", async (req, res) => {
  try {
    // console.log(req.params);
    // console.log(req.body);
    const appointments = await Appointment.find({
      userId: req.params.userId,
      status: req.body.status,
    });
    //console.log(appointments);
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).send("something went wrong.....");
  }
});



router.post("/lawyerr/:lawyerrId", async (req, res) => {
  try {
    const filter = { lawyerId: req.params.lawyerrId, status: req.body.status };
    const appointments = await Appointment.find(filter);
    return res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send("something went wrong.....");
  }
});

//update status of appointment by appointment id
router.put("/update", async (req, res) => {
  try {
    const filter = { _id: req.body.appointmentId };
    let option;
    if (req.body.ratingByUser) {
      option = {
        status: req.body.status,
        ratingByUser: req.body.ratingByUser,
      };
    } else {
      option = {
        status: req.body.status,
      };
    }

    const appointment = await Appointment.findOneAndUpdate(filter, option);
    console.log("option>>>>>>,", option);
    console.log("appointment", appointment);
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const resp = await Appointment.findOneAndRemove(filter);
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
//getting client pending appointment
router.get("/pending", fetchuser, async (req, res) => {
  const userId = req.userId;
  const appointments = await Appointment.find({
    clientId: userId,
    status: "Pending",
  });
  console.log("pending appointments>", appointments);
  if (appointments.length > 0) {
    res.status(200).json(appointments);
  } else {
    res.status(404).json({ success: "failed" });
  }
});
//getting  attended appointment
router.get("/attended/:userType", fetchuser, async (req, res) => {
  const userId = req.userId;
  const { userType } = req.params;
  let appointments;
  if (userType == "lawyer") {
    appointments = await Appointment.find({
      lawyerId: userId,
      status: "Attended",
    });
  } else if (userType == "client") {
    appointments = await Appointment.find({
      clientId: userId,
      status: "Attended",
    });
  }

  //console.log("attended appointments>", appointments);
  if (appointments.length > 0) {
    res.status(200).json(appointments);
  } else {
    res.status(404).json({ success: "failed" });
  }
});

//getting upcomingappointment
router.get("/upcoming/:userType", fetchuser, async (req, res) => {
  const userId = req.userId;
  const { userType } = req.params;
  let appointments;
  if (userType == "lawyer") {
    appointments = await Appointment.find({
      lawyerId: userId,
      status: "Confirmed",
    });
  } else if (userType == "client") {
    appointments = await Appointment.find({
      clientId: userId,
      status: "Confirmed",
    });
  }

  console.log("upcoming appointments>", appointments);
  if (appointments?.length > 0) {
    res.status(200).json(appointments);
  } else {
    res.status(404).json({ success: "failed" });
  }
});

//getting cancelled appointment
router.get("/cancelled/:userType", fetchuser, async (req, res) => {
  const userId = req.userId;
  const { userType } = req.params;
  let appointments;
  if (userType == "lawyer") {
    appointments = await Appointment.find({
      lawyerId: userId,
      status: "Cancelled",
    });
  } else if (userType == "client") {
    appointments = await Appointment.find({
      clientId: userId,
      status: "Cancelled",
    });
  }

  console.log("cancelled appointments>", appointments);
  if (appointments.length > 0) {
    res.status(200).json(appointments);
  } else {
    res.status(404).json({ success: "failed" });
  }
});
//set appointment status confirmed
router.put(
  "/confirm-appointment/:appointmentId",

  async (req, res) => {
    const { appointmentId } = req.params;
    try {
      const filter = { _id: appointmentId };
      const option = { $set: { status: "Confirmed" } };
      const updatedAppointment = await Appointment.findOneAndUpdate(
        filter,
        option
      );
      console.log("updated Appointment>", updatedAppointment);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
router.post("/today-specific/:userType", fetchuser, async (req, res) => {
  const userId = req.userId;
  const { userType } = req.params;
  const { date } = req.body;

  console.log("date > ", date);
  let appointments = [];
  if (userType == "lawyer") {
    appointments = await Appointment.find({
      lawyerId: userId,
      status: "Confirmed",
      appointmentDate: date,
    });
  } else if (userType == "client") {
    appointments = await Appointment.find({
      clientId: userId,
      status: "Confirmed",
      appointmentDate: date,
    });
  }

  console.log("todays appointments>", appointments);
  if (appointments.length > 0) {
    res.status(200).json(appointments);
  } else {
    res.status(404).json({ success: "failed" });
  }
});
module.exports = router;

import api from "../utils/api";
export const cancelAppointment = async (id, navigate, currentUser) => {
  try {
    const body = {
      appointmentId: id,
      status: "Cancelled",
    };
    console.log("body:", body);

    const appointment = await api.put("/appointment/update", body);
    if (currentUser?.userType == "lawyer") {
      navigate("/dashboard/cancelled__appointments");
    } else {
      navigate("/appointments/cancelled");
    }
  } catch (error) {
    console.log(error.message);
  }
};

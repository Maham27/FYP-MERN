import api from "../utils/api";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
const sendVerificationEmail = (currentUser) => {
  console.log("running");

  const body = {
    _id: currentUser.id,
    email: currentUser.email,
  };
  console.log(body);
  api
    .post("/auth/send-verify-email", body)
    .then((res) => {
      console.log("res from sending verif email>>", res);
      window.location.href("/verify-your-account");
    })
    .catch((err) => console.log(err));
};

export const registerUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  console.log("user at userActions >>> ", user);
  try {
    const response = await api.post("/auth/createUser", user);
    setTimeout(() => {
      console.log("response at register>>>", response);
    }, 1000);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
    let currentUser = {
      id: response.data.data.user.id,
      email: user?.email,
    };
    sendVerificationEmail(currentUser);
    Swal.fire("Registered Successfully!", "Click to Login", "success");
    navigate("/verify-your-account");
    window.location.reload();
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
    console.log("error at register>>>", error);
    swalWithBootstrapButtons.fire(
      "Registeration Unsuccessful!",
      "Something goes wrong",
      "error"
    );
  }
};

export const loginUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  console.log("user request at loginUserAction>>> ", user);
  try {
    const response = await api.post("/auth/login", user);
    const userData = response.data.userData;
    console.log("userdata at login>>>", userData);
    localStorage.setItem("token", response.data.authtoken);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
    localStorage.setItem("currentUser", JSON.stringify(userData));
    if (userData?.verified) {
      if (
        userData?.isProfileCompleted == true ||
        userData?.userType == "client"
      ) {
        if (userData?.userType == "lawyer") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/";
        }
      }
      
       else {
        window.location.href = "/barcode";
      }
    } else {
      navigate("/verify-your-account");
    }
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    swalWithBootstrapButtons.fire(
      "login Unsuccessful!",
      "incorrect information",
      "error"
    );
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  localStorage.clear();
  window.location.href = "/";
};
/*
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });

  try {
    const response = await axios.get("/api/users/getallusers");
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("/api/users/deleteuser", { userid });
    alert("User deleted successfully!!!");
    window.location.reload();
  } catch (error) {
    alert("Something went wrong!!!");
    console.log(error);
  }
};
*/

import api from "../utils/api";
import AES from "crypto-js/aes";
import { logoutUser } from "./userActions";

export const accountUpdateAction = async (
  userName,
  oldPassword,
  newPassword,
  navigate,
  currentUser
) => {
  console.log("account update action");

  oldPassword = AES.encrypt(oldPassword, "LAWYERSERVICES").toString();
  newPassword = AES.encrypt(newPassword, "LAWYERSERVICES").toString();
  const userData = {
    name: userName,
    old_password: oldPassword,
    password: newPassword,
  };
  console.log("userData", userData);
  api
    .post("/auth/update", userData)
    .then((res) => {
      console.log("res.data>>>", res.data);
      if (res.data.userData) {
        var currentObject = Object.assign(currentUser, {
          name: userData.name,
        });
        localStorage.setItem("currentUser", JSON.stringify(currentObject));
        alert("account updated successfully");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        localStorage.clear();
        window.location.href = "/login";
        window.location.reload();
        logoutUser();
      } else {
        alert("account updation failed");
      }
    })
    .catch((err) => alert("account updation failed"));
};

import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import api from "../../utils/api";
import { Form, Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accountUpdateAction } from "../../Actions/accountActions";

const Account = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(currentUser?.profile);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState(currentUser?.name);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const uploadPhoto = async (e) => {
    console.log(e.target);
    console.log("running upload file ");
    let files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "pauhtddz");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbjdalghs/image/upload",

      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log("response from cloudinary>>>", file);
    setProfileImage(file?.secure_url);
    let e2 = { target: { name: "image", value: file.secure_url } };
    // handleChange(e2);
    console.log("file profie image>>> ", file);
  };
  const saveProfile = (e) => {
    e.preventDefault();
    if (profileImage !== "") {
      api
        .put("/user/updateProfileImage", {
          userId: currentUser?.id,
          imgUrl: profileImage,
        })
        .then((res) => {
          console.log("res from uload profile", res.data);
          var currentObject = Object.assign(currentUser, {
            profile: profileImage,
          });
          console.log("profile ", currentObject);
          localStorage.setItem("currentUser", JSON.stringify(currentObject));
          setShowUploadButton(false);
          window.location.reload();
        })
        .catch((err) => console.log("error from uploading profile", err));
    }
  };
  const updateUsernameAndPassword = () => {
    setErrors({
      username: "",
      oldPassword: "",
      confirmPassword: "",
      newPassword: "",
    });
    let test = oldPassword === confirmPassword;
    console.log("test>>>");
    console.log("updating userName and Password>>");
    console.log("username", username);
    console.log("oldPassword", oldPassword);
    console.log("newPassword", newPassword);
    console.log("confirmPassword", confirmPassword);
    if (username == "") {
      setErrors({ username: "field must be filled out!" });
    } else if (username.length < 5) {
      setErrors({
        username: "username should be minimum 5 chrachters long!",
      });
    } else if (oldPassword == "") {
      setErrors({ oldPassword: "field must be filled out!" });
    } else if (confirmPassword == "") {
      setErrors({ confirmPassword: "field must be filled out!" });
    } else if (confirmPassword !== newPassword) {
      setErrors({ confirmPassword: "Password do not match!" });
    } else if (newPassword == "") {
      setErrors({ newPassword: "field must be filled out!" });
    } else if (newPassword.length < 6) {
      setErrors({
        newPassword: "Password should be minimum 6 chrachters long!",
      });
    } else {
      console.log(errors);
      accountUpdateAction(
        username,
        oldPassword,
        newPassword,
        navigate,
        currentUser
      );
    }
    console.log(errors);
  };
  return (
    <div className="account__page">
      <div className="account__page__user__info">
        {/* <img
          className="profile__image"
          src={
            currentUser?.profile
              ? currentUser?.profile
              : "https://www.cheshirescouts.org.uk/wp-content/uploads/blank-picture.jpg"
          }
          alt="profile"
        /> */}
        <Avatar className="profile__image" src={profileImage}>
          {currentUser?.name[0]}
        </Avatar>

        <>
          <button
            className="upload__profile__photo__btn"
            onClick={(e) => setShowUploadButton(true)}
          >
            upload photo
          </button>
          {/* <input type="file" placeholder="select profile image" /> */}
          {showUploadButton && (
            <div
              style={{ height: "5vh", marginBottom: "3vh", display: "flex" }}
            >
              <Form.Control
                type="file"
                name="image"
                required
                style={{ height: "5vh" }}
                onChange={(e) => uploadPhoto(e)}
              />
              <Button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#39b54a",
                  border: "none",
                }}
                variant="primary"
                onClick={(e) => saveProfile(e)}
              >
                Upload
              </Button>
            </div>
          )}
        </>

        <h1 className="account__name">{currentUser?.name}</h1>
        {/* <h1 className="account__email">{currentUser?.email}</h1> */}
        <div className="change__account__info">
          <p className="account__change__username__para">
            Change Username And Password
          </p>
          {/* <p className="account__change__profile__para">Change Profile pic</p> */}
        </div>
        <br />
        <div className="updateForm2">
          {/* <label className="label"> Name </label> */}
          <input
            type="text"
            name="name"
            placeholder="Enter new name"
            className={`form-control `}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors?.username && (
            <p className="error__para">{errors?.username}</p>
          )}
          <input
            type="password"
            name="old_password"
            placeholder="Current Password (required)"
            className={`form-control`}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {errors?.oldPassword && (
            <p className="error__para">{errors?.oldPassword}</p>
          )}
          {/* <label className="label">New Password </label> */}

          <input
            type="password"
            name="password"
            placeholder="Enter a new password "
            className={`form-control `}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors?.newPassword && (
            <p className="error__para">{errors?.newPassword}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="confirm new password "
            className={`form-control `}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors?.confirmPassword && (
            <p className="error__para">{errors?.confirmPassword}</p>
          )}

          {/* <label className="label">Current Password (required) </label> */}

          <button type="submit" onClick={() => updateUsernameAndPassword()}>
            Update
          </button>
          {/*</div>*/}
        </div>

        <br />
      </div>
    </div>
  );
};

export default Account;

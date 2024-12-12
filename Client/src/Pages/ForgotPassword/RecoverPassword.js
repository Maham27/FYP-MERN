import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import api from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import AES from "crypto-js/aes";

const RecoverPassword = () => {
  const { userId, uniqueString } = useParams();
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("none");
  const navigate = useNavigate("/login");

  const onSubmit = () => {
    console.log("submitting");

    var newPassword = AES.encrypt(password, "LAWYERSERVICES").toString();

    api
      .get(
        `/auth/recovery/update-password/${userId}/${uniqueString}/${newPassword}`
      )
      .then((res) => {
        if (res.data) {
          console.log("response from updating password>> ", res.data);
          setResult("Password Updated Successfully. Go Login!");
          setResultType("success");
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        setResult("Error while updating password. Try again!");
        setResultType("error");
      });
  };

  return (
    <div className="forgot__password__container">
      <h1>Recover you account</h1>
      <br />
      <div className="email__container">
        <p>Enter new password</p>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => onSubmit()}>Submit</button>
        <div
          className={
            resultType === "success"
              ? "result__box success"
              : resultType === "error"
              ? " result__box error"
              : "result__box"
          }
        >
          <>{result} </>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;

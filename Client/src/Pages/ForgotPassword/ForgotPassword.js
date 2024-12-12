import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import api from "../../utils/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("none");
  const onSubmit = () => {
    console.log("email>", email);
    if (email) {
      api
        .get(`/auth/check-user-by-email/${email}`)
        .then((res) => {
          console.log("res>", res.data);
          if (res.data.success) {
            setResult("Sending mail!");
            setResultType("success");
            /* send mail with change password link  */
            const body = {
              email: email,
              id: res.data.id,
            };
            api
              .post("/auth/send-change-password-link", body)
              .then((res) => {
                if (res.data) {
                  console.log("success email sent", res.data);
                  setResult("recovery link has been sent to your email!");
                  setResultType("success");
                }
              })
              .catch((err) => {
                setResult("Error while sending mail. Try again!");
                setResultType("error");
              });

            /***************************************/
          }
        })
        .catch((err) => {
          setResult("Email not found!");
          setResultType("error");
        });
    }
  };
  return (
    <div className="forgot__password__container">
      <h1>Forgot Password?</h1>;
      <div className="email__container">
        <p>Enter your email</p>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
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

export default ForgotPassword;

import React, { useEffect, useState } from "react";
import "./VerifyEmail.css";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Loading from "../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

import EmailIcon from "@mui/icons-material/Email";

const VerifyEmail = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [path, setPath] = useState("");
  const { userId, uniqueString } = useParams();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);
  const [loading, showLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      showLoading(false);
    }, 1000);
  }, [loading]);
  useEffect(() => {
    console.log("current location>>>", window.location.pathname);
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    if (userId) {
      api
        .get(`/auth/getuserById/${userId}`)
        .then((res) => {
          if (res.data.verified === true) {
            setIsAlreadyVerified(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      api
        .get(`/auth/verify/${userId}/${uniqueString}`)
        .then((res) => {
          console.log("res from get", res);
          setSuccess(true);
        })
        .catch((err) => {
          console.log("error from get>", err.message);
          setSuccess(false);
        });
    }
  }, []);

  return (
    <>
      {loading && <Loading />}
      {path === "/verify-your-account" ? (
        <div className="VerifyEmail">
          <div className={"email__verified__sent__container"}>
            <h1>
              <span> Verification Email Sent. Check that and verify</span>
            </h1>

            <EmailIcon />
          </div>
        </div>
      ) : (
        <div className="VerifyEmail">
          {/* <div>VerifyEmail</div>
      <h1>{uniqueString}</h1> */}
          {isAlreadyVerified ? (
            <div className="email__verified__success__container">
              <h1>
                {" "}
                Your email is already <span>verified</span>
              </h1>

              <CheckCircleIcon />
              <button
                className="form-submit"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          ) : (
            <div
              className={
                success
                  ? "email__verified__success__container"
                  : "email__verified__failure__container"
              }
            >
              {success ? (
                <h1>
                  {" "}
                  Your email has been verified <span>successfully</span>
                </h1>
              ) : (
                <h1>
                  <span> Your email has not been verified</span>
                </h1>
              )}

              {success ? (
                <>
                  <CheckCircleIcon />
                  <button
                    className="form-submit"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </>
              ) : (
                <CancelIcon />
              )}
              {/* {success && (
              <Link to="/">
                {" "}
                <button>Continue </button>
              </Link>
            )} */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VerifyEmail;

import React from "react";
import "./Joinlawyer.css";
import { useNavigate } from "react-router-dom";
const Joinlawyer = () => {
     const navigate = useNavigate();
  return (
    <>
      <h1>Are you a lawyer?</h1>
      <div className="Container">
      <div className="text-center">
        <div className="lawyer card text-center">
          <div className="card-body">
            <h3>Join us as a lawyer</h3>
            <h3>Get apppointments from clients</h3>
            <h3>Earn money</h3>
            <h3>Manage your schedule</h3>
            <div className="buttons">
              <button
                onClick={() => navigate("/signup")}
                className="main__action__btn btn__two"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  );
};

export default Joinlawyer;

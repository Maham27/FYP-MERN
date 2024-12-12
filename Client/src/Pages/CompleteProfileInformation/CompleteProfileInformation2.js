import React, { useState } from "react";
import "./CompleteProfileInformation2.css";
import CompleteProfileForm from "../CompleteProfileForm/CompleteProfileForm";

const CompleteProfileInformation2 = ({ isEditing }) => {
  const [step, setStepCount] = useState(2);
  return (
    <div className="complete__profile__information">
      <div className="complete__profile__information__header">
        <h1>
          {isEditing
            ? "Edit your Profile Information!"
            : "Complete your Profile Information!"}
        </h1>
        <div className="steps__loading__container">
          <span className="checkpoint active">1</span>
          <span className={step > 1 ? "checkpoint active" : "checkpoint"}>
            2
          </span>
          <span className={step > 2 ? "checkpoint active" : "checkpoint"}>
            3
          </span>
          <span className="loading__bar"></span>
          <span
            className={
              step == 1 ? "filler" : step == 2 ? "filler step2" : "filler step3"
            }
          ></span>
        </div>
      </div>
      <CompleteProfileForm setStepCount={setStepCount} isEditing={isEditing} />
    </div>
  );
};

export default CompleteProfileInformation2;

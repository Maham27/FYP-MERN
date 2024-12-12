import React, { useState, useEffect } from "react";
import "./CompleteProfileForm.css";
import PersonalStep from "../../Components/CompleteProfileSteps/PersonalStep";
import ProfessionalStep from "../../Components/CompleteProfileSteps/ProfessionalStep";
import FinalStep from "../../Components/CompleteProfileSteps/FinalStep";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CompleteProfileForm = ({ setStepCount, isEditing }) => {
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [step, setStep] = useState(1);
  const [personalData, setPersonalData] = useState([]);
  const [professionalData, setProfessionalData] = useState({});
  const [appointmentFee, setAppointmentFee] = useState(0);
  const [startAvailabilityTime, setStartAvailabilityTime] = useState("");
  const [endAvailabilityTime, setEndAvailabilityTime] = useState("");
  const [bankAccountDetails, setBankAccountDetails] = useState({});

  console.log("currentUser");
  useEffect(() => {
    setStepCount(step);
  }, [step]);
  useEffect(() => {
    console.log("personal>", personalData);
  }, [personalData]);
  useEffect(() => {
    console.log("professional>", professionalData);
  }, [professionalData]);
  useEffect(() => {
    console.log("appointment fee>", appointmentFee);
  }, [appointmentFee]);
  useEffect(() => {
    if (isEditing) {
      api
        .get(`/user/getUserById/${currentUser?.id}`)
        .then((res) => {
          console.log("all data user>>>>>>", res.data);
          setPersonalData(res.data?.personalInfo);
          setProfessionalData(res.data?.professionalInfo);
          setAppointmentFee(res.data?.appointmentFee);
          setStartAvailabilityTime(
            res.data?.startAvailabilityTime
              ? res.data?.startAvailabilityTime
              : "09:00:00"
          );
          setEndAvailabilityTime(
            res.data?.endAvailabilityTime
              ? res.data?.endAvailabilityTime
              : "09:00:00"
          );
          setBankAccountDetails(res?.data?.bankAccountDetails);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const fillPersonalData = (data) => setPersonalData(data);
  const fillProfessionalData = (data) => setProfessionalData(data);
  const fillAppointmentData = (data) => setAppointmentFee(data);

  const submitAllInformation = (e) => {
    console.log("submitting all");
    console.log("personal>", personalData);
    console.log("professional>", professionalData);
    console.log("appointment fee>", appointmentFee);

    let userId = currentUser.id ? currentUser.id : currentUser._id;
    const data = {
      personal: personalData,
      professional: professionalData,
      fee: appointmentFee,
      startAvailabilityTime,
      endAvailabilityTime,
      bankAccountDetails,
    };
    api
      .post(`/auth/update-complete-profile-information/${userId}`, data)
      .then((res) => {
        console.log("response from submitting complete profile info", res.data);
        Swal.fire("Good job!", "Profile Updated Successfully!", "success");
        console.log("try");
        var currentObject = Object.assign(currentUser, {
          isProfileCompleted: true,
        });
        console.log("currentobject", currentObject);
        localStorage.setItem("currentUser", JSON.stringify(currentObject));
        document.location.href = "/";
      })
      .catch((err) => {
        console.log("failed to submite all profile info");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  switch (step) {
    case 1:
      return (
        <PersonalStep
          nextStep={nextStep}
          setPersonalData={fillPersonalData}
          isEditing={isEditing}
          personalData={personalData}
        />
      );
    case 2:
      return (
        <ProfessionalStep
          nextStep={nextStep}
          prevStep={prevStep}
          setProfessionalData={fillProfessionalData}
          isEditing={isEditing}
          professionalInfo={professionalData}
        />
      );
    case 3:
      return (
        <FinalStep
          nextStep={nextStep}
          prevStep={prevStep}
          setAppointmentCharges={fillAppointmentData}
          setStartAvailabilityTime={setStartAvailabilityTime}
          setEndAvailabilityTime={setEndAvailabilityTime}
          submitAllInformation={submitAllInformation}
          isEditing={isEditing}
          appointmentFees={appointmentFee}
          startAvailabilityTime={startAvailabilityTime}
          endAvailabilityTime={endAvailabilityTime}
          bankAccountDetails={bankAccountDetails}
          setBankAccountDetails={setBankAccountDetails}
        />
      );
  }
};

export default CompleteProfileForm;

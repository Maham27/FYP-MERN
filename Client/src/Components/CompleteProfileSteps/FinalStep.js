import React, { useState, useEffect } from "react";

const FinalStep = ({
  setAppointmentCharges,
  prevStep,
  submitAllInformation,
  isEditing,
  appointmentFees,
  startAvailabilityTime,
  endAvailabilityTime,
  setStartAvailabilityTime,
  setEndAvailabilityTime,
  bankAccountDetails,
  setBankAccountDetails,
}) => {
  const [appointmentFee, setAppointmentFee] = useState(1000);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bank, setBank] = useState("Al Baraka Bank (Pakistan) Limited");
  const [bankAccount, setBankAccount] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setAppointmentCharges(appointmentFee);
    setStartAvailabilityTime(startTime);
    setEndAvailabilityTime(endTime);
  }, [appointmentFee, startTime, endTime]);
  useEffect(() => {
    setBankAccountDetails({ bank: bank, bankAccount: bankAccount });
  }, [bank, bankAccount]);
  useEffect(() => {
    if (isEditing) {
      setAppointmentFee(appointmentFees);
      setStartTime(startAvailabilityTime);
      setEndTime(endAvailabilityTime);
      setBank(bankAccountDetails?.bank);
      setBankAccount(bankAccountDetails?.bankAccount);
    }
  }, []);
  const saveAndContinue = (e) => {
    if (bankAccount?.length < 1) {
      setError("required");
    } else if (!/^\d+$/.test(bankAccount)) {
      setError("enter valid account number");
    } else {
      submitAllInformation();
    }
  };
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div className="final__step personal__step">
      <h1>Step 3</h1>
      <p>Almost Done!</p>
      <div className="form">
        <div className="group">
          <label>Appointment Fee</label>
          <div>
            <select
              name="appointmentFee"
              value={appointmentFee}
              onChange={(e) => setAppointmentFee(e.target.value)}
              style={{ width: "20vw", display: "inline" }}
            >
              <option value={1000}>1,000</option>
              <option value={2000}>2,000</option>
              <option value={3000}>3,000</option>
              <option value={4000}>4,000</option>
              <option value={5000}>5,000</option>
              <option value={6000}>6,000</option>
              <option value={7000}>7,000</option>
              <option value={8000}>8,000</option>
              <option value={9000}>9,000</option>
              <option value={10000}>10,000</option>
            </select>
            <b
              style={{ display: "inline", float: "left", marginRight: "20px" }}
            >
              RS
            </b>
          </div>
        </div>
        <div className="group">
          <label className="label">Set your availability</label>

          <select
            as="select"
            name="ticketValue"
            defaultValue={appointmentFee}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ width: "20vw", display: "inline" }}
          >
            <option value={"09:00:00"}>9 AM</option>
            <option value={"09:30:00"}>9:30 AM</option>
            <option value={"10:00:00"}>10 AM</option>
            <option value={"10:30:00"}>10:30 AM</option>
            <option value={"11:00:00"}>11 AM</option>
            <option value={"11:30:00"}>11:30 AM</option>
            <option value={"12:00:00"}>12 PM</option>
            <option value={"12:30:00"}>12:30 PM</option>
            <option value={"13:00:00"}>1 PM</option>
            <option value={"13:30:00"}>1:30 PM</option>
            <option value={"14:00:00"}>2 PM</option>
            <option value={"14:30:00"}>2:30 PM</option>
            <option value={"15:00:00"}>3 PM</option>
            <option value={"15:30:00"}>3:30 PM</option>
            <option value={"16:00:00"}>4 PM</option>
            <option value={"16:30:00"}>4:30 PM</option>
            <option value={"17:00:00"}>5 PM</option>
            <option value={"17:30:00"}>5:30 PM</option>
            <option value={"18:00:00"}>6 PM</option>
            <option value={"18:30:00"}>6:30 PM</option>
            <option value={"19:00:00"}>7 PM</option>
            <option value={"19:30:00"}>7:30 PM</option>
            <option value={"20:00:00"}>8 PM</option>
            <option value={"20:30:00"}>8:30 PM</option>
            <option value={"21:00:00"}>9 PM</option>
          </select>
          <b style={{ display: "block", margin: "0vh" }}> to </b>
          <select
            as="select"
            name="ticketValue"
            defaultValue={appointmentFee}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ width: "20vw", display: "inline" }}
          >
            <option value={"09:00:00"}>9 AM</option>
            <option value={"09:30:00"}>9:30 AM</option>
            <option value={"10:00:00"}>10 AM</option>
            <option value={"10:30:00"}>10:30 AM</option>
            <option value={"11:00:00"}>11 AM</option>
            <option value={"11:30:00"}>11:30 AM</option>
            <option value={"12:00:00"}>12 PM</option>
            <option value={"12:30:00"}>12:30 PM</option>
            <option value={"13:00:00"}>1 PM</option>
            <option value={"13:30:00"}>1:30 PM</option>
            <option value={"14:00:00"}>2 PM</option>
            <option value={"14:30:00"}>2:30 PM</option>
            <option value={"15:00:00"}>3 PM</option>
            <option value={"15:30:00"}>3:30 PM</option>
            <option value={"16:00:00"}>4 PM</option>
            <option value={"16:30:00"}>4:30 PM</option>
            <option value={"17:00:00"}>5 PM</option>
            <option value={"17:30:00"}>5:30 PM</option>
            <option value={"18:00:00"}>6 PM</option>
            <option value={"18:30:00"}>6:30 PM</option>
            <option value={"19:00:00"}>7 PM</option>
            <option value={"19:30:00"}>7:30 PM</option>
            <option value={"20:00:00"}>8 PM</option>
            <option value={"20:30:00"}>8:30 PM</option>
            <option value={"21:00:00"}>9 PM</option>
          </select>
        </div>
        <div className="group">
          <label>Bank Account Details</label>
          <br />
          <input
            type="text"
            placeholder="Account No."
            name="Account No."
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
          />
          {error && <p className="error__para">{error}</p>}
          <select
            as="select"
            name="ticketValue"
            defaultValue={appointmentFee}
            onChange={(e) => setBank(e.target.value)}
            style={{ width: "20vw", display: "inline" }}
          >
            {banks.map((bank) => (
              <option value={bank}>{bank}</option>
            ))}
          </select>

          {/* {errs.licenseNumber && (
            <p className="error__para">{errs.licenseNumber}</p>
          )} */}
        </div>

        {/* <div className="complete__profile__btns">
          <button
            className="complete__profile__back__btn"
            onClick={(e) => back(e)}
          >
            Back
          </button>
          <button
            className="complete__profile__next__btn"
            onClick={(e) => saveAndContinue(e)}
          >
            Submit
          </button>
        </div> */}
        <button
          className="personal__step__save__btn"
          variant="primary"
          onClick={(e) => saveAndContinue(e)}
        >
          {isEditing ? "Update Profile" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FinalStep;
let banks = [
  "Al Baraka Bank (Pakistan) Limited",
  "Allied Bank Limited",
  " Askari Bank",
  "Bank Alfalah Limited",
  "  Bank Al-Habib Limited",
  "BankIslami Pakistan Limited",
  "Citi Bank",
  "Deutsche Bank A.G",
  "  The Bank of Tokyo-Mitsubishi UFJ",
  "Dubai Islamic Bank Pakistan Limited",
  " Faysal Bank Limited",
  " First Women Bank Limited",
  "Habib Bank Limited",
  "Standard Chartered Bank (Pakistan) Limited",
  " Habib Metropolitan Bank Limited",
  "Industrial and Commercial Bank of China",
  "Industrial Development Bank of Pakistan",
  "JS Bank Limited",
  "MCB Bank Limited",
  "MCB Islamic Bank Limited",
  " Meezan Bank Limited",
  "National Bank of Pakistan",
];

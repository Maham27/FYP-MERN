import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PersonalStep = ({
  nextStep,
  setPersonalData,
  isEditing,
  personalData,
}) => {
  const [phoneValue, setPhoneValue] = useState("");
  const [licenceUrl, setLicenseUrl] = useState("");
  const [licencepicUrl, setLicensepicUrl] = useState("");
  const [licenceuserpicUrl, setLicenseuserpicUrl] = useState("");
  const [selectedAOPs, setSelectedAOPs] = useState([]);
  const [errs, setErrors] = useState({});

  const areasOfPractice = [
    "General Practice",
    "Criminal",
    "Civil",
    "Taxation",
    "Banking and finance",
    "Family Law",
    "Cyber Crime",
  ];
  const PersonalInfoTemplate = {
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    licenseNumber: "",
    licensePicture: "",
    licensePic: "",
    licenseUserPic: "",
    areasOfPractice: [],
    cityOfPractice: "",
    officeAddress: "",
  };
  const [personalInfo, setPersonalInfo] = useState(PersonalInfoTemplate);
  useEffect(() => {
    if (isEditing) {
      setPersonalInfo(personalData);
      console.log("personal Info>>>>", personalData);
    }
  }, [personalData]);

  const onChange = (e) => {
    const updatedInfo = Object.assign(personalInfo, {
      [e.target.name]: e.target.value,
    });
    setPersonalInfo(updatedInfo);
  };
  const changePhone = (value) => {
    let e = {
      target: {
        name: "phone",
        value: value,
      },
    };
    onChange(e);
  };
  const uploadLicensePicture = async (e) => {
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
    setLicenseUrl(file?.secure_url);
    let e2 = { target: { name: "licensePicture", value: file.secure_url } };
    onChange(e2);
    console.log("license>>> ", file);
  };
  const uploadLicensePic = async (e) => {
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
    setLicensepicUrl(file?.secure_url);
    let e2 = { target: { name: "licensePic", value: file.secure_url } };
    onChange(e2);
    console.log("license>>> ", file);
  };
   const uploadLicenseUserPic = async (e) => {
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
     setLicenseuserpicUrl(file?.secure_url);
     let e2 = { target: { name: "licenseUserPic", value: file.secure_url } };
     onChange(e2);
     console.log("license>>> ", file);
   };
  const changeAOPs = (e) => {
    if (e.target.checked) {
      setSelectedAOPs([...selectedAOPs, e.target.name]);
    } else {
      var filteredAOPs = selectedAOPs.filter((item) => item !== e.target.name);
      setSelectedAOPs(filteredAOPs);
    }
  };
  useEffect(() => {
    let e = {
      target: {
        name: "areasOfPractice",
        value: selectedAOPs,
      },
    };
    onChange(e);
  }, [selectedAOPs]);
  useEffect(() => {
    let e = {
      target: {
        name: "phone",
        value: phoneValue,
      },
    };
    onChange(e);
  }, [phoneValue]);
  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  function isAlphaNumeric(str) {
    return /^[A-Za-z0-9]+$/.test(str);
  }
  const checkErrors = () => {
    let data = personalInfo;
    let errors = {};
    if (data.firstName.length < 1) {
      Object.assign(errors, { firstName: "this field must be filled" });
    } else if (!onlyLettersAndSpaces(data.firstName)) {
      Object.assign(errors, {
        firstName: "this field could include letters only",
      });
    }
    if (data.lastName.length < 1) {
      Object.assign(errors, { lastName: "this field must be filled" });
    } else if (!onlyLettersAndSpaces(data.lastName)) {
      Object.assign(errors, {
        lastName: "this field could include letters only",
      });
    }
    if (data.phone.length < 1) {
      Object.assign(errors, { phone: "this field must be filled" });
    }
    if (data.licenseNumber.length < 1) {
      Object.assign(errors, { licenseNumber: "this field must be filled" });
    } else if (!isAlphaNumeric(data.licenseNumber)) {
      Object.assign(errors, {
        licenseNumber: "License number should be alphanumeric",
      });
    } else if (data.licenseNumber.length < 4) {
      Object.assign(errors, { licenseNumber: "inappropriate license number" });
    }
    if (data.licensePicture.length < 1) {
      Object.assign(errors, { licensePicture: "this field must be filled" });
    }
     if (data.licensePic < 1) {
       Object.assign(errors, { licensePic: "this field must be filled" });
     }
     if (data.licenseUserPic < 1) {
       Object.assign(errors, { licenseUserPic: "this field must be filled" });
     }
    if (data.areasOfPractice.length < 1) {
      Object.assign(errors, { areasOfPractice: "select atleast one area" });
    }
    if (data.bio.length < 1) {
      Object.assign(errors, { bio: "this field must be filled" });
    } else if (data.bio.length < 200 || data.bio.length > 2500) {
      Object.assign(errors, {
        bio: "bio should be min. 200 and max. 2500 chrachters long",
      });
    }
    if (data.cityOfPractice.length < 1) {
      Object.assign(errors, { cityOfPractice: "this field must be filled" });
    }
    if (data.officeAddress.length < 1) {
      Object.assign(errors, { officeAddress: "this field must be filled" });
    }

    return errors;
  };
  const saveAndContinue = (e) => {
    e.preventDefault();
    console.log("personalInfo>", personalInfo);
    /*************** check errors*/
    let errors = checkErrors();
    setErrors(errors);
    /*************************** */
    console.log("errors>>", errors);
    var totalErrors = Object.keys(errors).length;
    if (totalErrors == 0) {
      setPersonalData(personalInfo);
      nextStep();
    }
  };
  return (
    <div className="personal__step">
      <h1>Step 1</h1>
      <p>Fill up your personal information</p>
      <div className="form">
        <div className="group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="John"
            name="firstName"
            onChange={(e) => onChange(e)}
            // value={personalInfo.firstName}
          />
          {isEditing && <p>{personalData?.firstName}</p>}
          {errs.firstName && <p className="error__para">{errs.firstName}</p>}
        </div>
        <div className="group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            name="lastName"
            //value={personalInfo.lastName}
            onChange={(e) => onChange(e)}
          />
          {isEditing && <p>{personalData?.lastName}</p>}
          {errs.lastName && <p className="error__para">{errs.lastName}</p>}
        </div>
        <div className="group">
          <label>Phone Number</label>
          <PhoneInput
            placeholder="Enter phone number"
            //value={phoneValue}
            onChange={(value) => setPhoneValue(value)}
          />
          {isEditing && <p>{personalData?.phone}</p>}
          {errs.phone && <p className="error__para">{errs.phone}</p>}
        </div>
        <div className="group">
          <label>Write a Short Bio</label>
          <textarea
            placeholder="write here..."
            name="bio"
            // value={personalInfo.bio}
            onChange={(e) => onChange(e)}
          />
          {/* {isEditing && <p>{personalData?.bio}</p>} */}
          {errs.bio && <p className="error__para">{errs.bio}</p>}
        </div>
        <div className="group">
          <label>Advocate License Number</label>
          <input
            type="text"
            placeholder="A1B2C3"
            name="licenseNumber"
            //value={personalInfo.licenseNumber}
            onChange={(e) => onChange(e)}
          />
          {isEditing && <p>{personalData?.licenseNumber}</p>}
          {errs.licenseNumber && (
            <p className="error__para">{errs.licenseNumber}</p>
          )}
        </div>
        <div className="group">
          <label>Upload License Picture(frontside)</label>
          <input type="file" onChange={(e) => uploadLicensePicture(e)} />
          {licenceUrl && <img className="license__image" src={licenceUrl} />}

          {errs.licensePicture && (
            <p className="error__para">{errs.licensePicture}</p>
          )}
        </div>
        <div className="group">
          <label>Upload License Picture(backside)</label>
          <input type="file" onChange={(e) => uploadLicensePic(e)} />
          {licencepicUrl && (
            <img className="license__image" src={licencepicUrl} />
          )}

          {errs.licensePic && <p className="error__para">{errs.licensePic}</p>}
        </div>
        <div className="group">
          <label>Upload your picture with the licensePicture (for verification)</label>
          <input type="file" onChange={(e) => uploadLicenseUserPic(e)} />
          {licenceuserpicUrl && (
            <img className="license__image" src={licenceuserpicUrl} />
          )}

          {errs.licensePic && <p className="error__para">{errs.licensePic}</p>}
        </div>

        <div className="group">
          <label>Area of Practice</label>
          <div className="area__of__practices">
            {areasOfPractice.map((x) => (
              <div className="checkbox__container">
                <input
                  type="checkbox"
                  id={x}
                  name={x}
                  onChange={(e) => changeAOPs(e)}
                />
                <label for={x}>{x}</label>
              </div>
            ))}
          </div>
          {isEditing && (
            <p>
              Previously Selected :{" "}
              {personalData?.areasOfPractice?.map((t) => `${t}  `)}
            </p>
          )}
          {errs.areasOfPractice && (
            <p className="error__para">{errs.areasOfPractice}</p>
          )}
          <br />
        </div>
        <div className="group">
          <label>City of Practice</label>
          <input
            type="text"
            placeholder="Islamabad"
            name="cityOfPractice"
            //value={personalInfo.cityOfPractice}
            onChange={(e) => onChange(e)}
          />
          {isEditing && <p>{personalData?.cityOfPractice}</p>}
          {errs.cityOfPractice && (
            <p className="error__para">{errs.cityOfPractice}</p>
          )}
        </div>
        <div className="group">
          <label>Office Address (if exists) </label>
          <input
            type="text"
            placeholder="Street 3 newyork"
            name="officeAddress"
            //value={personalInfo.officeAddress}
            onChange={(e) => onChange(e)}
          />
          {isEditing && <p>{personalData?.officeAddress}</p>}
          {errs.officeAddress && (
            <p className="error__para">{errs.officeAddress}</p>
          )}
        </div>

        <button
          className="personal__step__save__btn"
          variant="primary"
          onClick={(e) => saveAndContinue(e)}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default PersonalStep;

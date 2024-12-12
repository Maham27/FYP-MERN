import React, { useState, useEffect } from "react";
import YearPicker from "react-year-picker";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ProfessionalStep = ({
  nextStep,
  prevStep,
  setProfessionalData,
  isEditing,
  professionalInfo,
}) => {
  console.log("professionalInfo", professionalInfo);

  const [eduErrors, setEduErrors] = useState([]);
  const [expErrors, setExpErrors] = useState([]);
  const [portfolioErrors, setPortfolioErrors] = useState([]);

  /*****   education portion */
  const educationTemplate = {
    title: "",
    institution: "",
    startYear: "",
    endYear: "",
  };
  const [educations, setEducations] = useState([educationTemplate]);
  const addEducation = () => {
    setEducations([...educations, educationTemplate]);
  };

  const onChangeForEdu = (e, idx) => {
    console.log("running onchange");
    console.log("index:", idx);
    console.log("e.target.value:", e.target.value);
    const updatedEducations = educations.map((edu, i) =>
      i == idx ? Object.assign(edu, { [e.target.name]: e.target.value }) : edu
    );
    setEducations(updatedEducations);
    console.log("updatedEducations>> ", updatedEducations);
  };
  const handleEduStartYear = (date, idx) => {
    let e = {
      target: {
        name: "startYear",
        value: date,
      },
    };
    onChangeForEdu(e, idx);
  };
  const handleEduEndYear = (date, idx) => {
    let e = {
      target: {
        name: "endYear",
        value: date,
      },
    };
    onChangeForEdu(e, idx);
  };
  const removeEducation = (idx) => {
    console.log("running remove education");
    const filteredEducations = [...educations];
    filteredEducations.splice(idx, 1);
    setEducations(filteredEducations);
  };
  /*************************************/
  /************ Experience portion */
  const experienceTemplate = {
    title: "",
    firm: "",
    startYear: "",
    endYear: "",
  };
  const [experiences, setExperiences] = useState([experienceTemplate]);
  const addExperience = () => {
    setExperiences([...experiences, experienceTemplate]);
  };

  const onChangeForExp = (e, idx) => {
    const updatedExperiences = experiences.map((edu, i) =>
      i == idx ? Object.assign(edu, { [e.target.name]: e.target.value }) : edu
    );
    setExperiences(updatedExperiences);
    console.log("updatedExperiences>> ", updatedExperiences);
  };
  const handleExpStartYear = (date, idx) => {
    let e = {
      target: {
        name: "startYear",
        value: date,
      },
    };
    onChangeForExp(e, idx);
  };
  const handleExpEndYear = (date, idx) => {
    let e = {
      target: {
        name: "endYear",
        value: date,
      },
    };
    onChangeForExp(e, idx);
  };
  const removeExperience = (idx) => {
    console.log("running remove experience");
    const filteredExperiences = [...experiences];
    filteredExperiences.splice(idx, 1);
    setExperiences(filteredExperiences);
  };

  /****************************** */
  /***** portfolio portion */

  const portfolioTemplate = {
    title: "",
    description: "",
  };
  const [portfolioItems, setPortfolioItems] = useState([portfolioTemplate]);
  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, portfolioTemplate]);
  };

  const onChangeForPortfolio = (e, idx) => {
    const updatedPortfolio = portfolioItems.map((item, i) =>
      i == idx ? Object.assign(item, { [e.target.name]: e.target.value }) : item
    );
    setPortfolioItems(updatedPortfolio);
    console.log("updatedPortflio>> ", updatedPortfolio);
  };

  const removePortfolioItem = (idx) => {
    console.log("running remove experience");
    const filteredPortfolio = [...portfolioItems];
    filteredPortfolio.splice(idx, 1);
    setPortfolioItems(filteredPortfolio);
  };

  /*************************** */
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };
  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  const checkEduErrors = () => {
    let data = educations;
    let errors = [];
    data.forEach((i) => errors.push({}));

    data.map((edu, idx) => {
      if (edu.title.length < 1) {
        Object.assign(errors[idx], { title: "this field must be filled" });
      } else if (!onlyLettersAndSpaces(edu.title)) {
        Object.assign(errors[idx], {
          title: "this field must contain letters only",
        });
      }
      if (edu.institution.length < 1) {
        Object.assign(errors[idx], {
          institution: "this field must be filled",
        });
      } else if (!onlyLettersAndSpaces(edu.institution)) {
        Object.assign(errors[idx], {
          institution: "this field must contain letters only",
        });
      }
      if (edu.startYear.length < 1) {
        Object.assign(errors[idx], { startYear: "this field must be filled" });
      }
      if (edu.endYear.length < 1) {
        Object.assign(errors[idx], { endYear: "this field must be filled" });
      } else if (parseInt(edu.startYear) - parseInt(edu.endYear) >= 0) {
        Object.assign(errors[idx], {
          endYear: "end date must be larger than start date",
        });
        console.log(
          "parseInt(edu.startYear) - parseInt(edu.endYear) < 0",
          parseInt(edu.startYear) - parseInt(edu.endYear) < 0
        );
      }
    });
    console.log("edu errors>>>", errors);
    setEduErrors(errors);
    return errors;
  };
  const checkExpErrors = () => {
    let data = experiences;
    let errors = [];
    data.forEach((i) => errors.push({}));

    data.map((edu, idx) => {
      if (edu.title.length < 1) {
        Object.assign(errors[idx], { title: "this field must be filled" });
      } else if (!onlyLettersAndSpaces(edu.title)) {
        Object.assign(errors[idx], {
          title: "this field must contain letters only",
        });
      }
      if (edu.firm.length < 1) {
        Object.assign(errors[idx], {
          firm: "this field must be filled",
        });
      } else if (!onlyLettersAndSpaces(edu.firm)) {
        Object.assign(errors[idx], {
          firm: "this field must contain letters only",
        });
      }
      if (edu.startYear.length < 1) {
        Object.assign(errors[idx], { startYear: "this field must be filled" });
      }
      if (edu.endYear.length < 1) {
        Object.assign(errors[idx], { endYear: "this field must be filled" });
      } else if (parseInt(edu.startYear) - parseInt(edu.endYear) >= 0) {
        Object.assign(errors[idx], {
          endYear: "end date must be larger than start date",
        });
        console.log(
          "parseInt(edu.startYear) - parseInt(edu.endYear) < 0",
          parseInt(edu.startYear) - parseInt(edu.endYear) < 0
        );
      }
    });
    console.log("exp errors>>>", errors);
    setExpErrors(errors);
    return errors;
  };
  const checkPortfolioErrors = () => {
    let data = portfolioItems;
    let errors = [];
    data.forEach((i) => errors.push({}));

    data.map((edu, idx) => {
      if (edu.title.length < 1) {
        Object.assign(errors[idx], { title: "this field must be filled" });
      } else if (!onlyLettersAndSpaces(edu.title)) {
        Object.assign(errors[idx], {
          title: "this field must contain letters only",
        });
      }
      if (edu.description.length < 1) {
        Object.assign(errors[idx], {
          description: "this field must be filled",
        });
      } else if (
        edu.description.length < 120 ||
        edu.description.length > 1000
      ) {
        Object.assign(errors[idx], {
          description:
            "this field must contain min. 120 and max. 1000 charachters",
        });
      }
    });
    console.log("portfolio errors>>>", errors);
    setPortfolioErrors(errors);
    return errors;
  };
  const saveAndContinue = (e) => {
    e.preventDefault();
    console.log("data>", educations, experiences, portfolioItems);
    /*** check errors */
    let e1 = checkEduErrors();
    let e2 = checkExpErrors();
    let e3 = checkPortfolioErrors();

    /************** */
    let isErrorFound = false;
    console.log("is errror found >>>>>>>>>>>", isErrorFound);
    e1.map((x) => (Object.keys(x).length > 0 ? (isErrorFound = true) : x));
    e2.map((x) => (Object.keys(x).length > 0 ? (isErrorFound = true) : x));
    e3.map((x) => (Object.keys(x).length > 0 ? (isErrorFound = true) : x));
    console.log("is errror found >>>>>>>>>>>", isErrorFound);
    if (!isErrorFound) {
      setProfessionalData({ educations, experiences, portfolioItems });
      nextStep();
    }
  };
  useEffect(() => {
    if (isEditing) {
      setEducations(professionalInfo?.educations);
      setExperiences(professionalInfo?.experiences);
      setPortfolioItems(professionalInfo?.portfolioItems);
    }
  }, [professionalInfo]);

  return (
    <div className="professional__step personal__step">
      <h1>Step 2</h1>

      <p>{isEditing ? "Update " : " Fill up"} your professional information</p>
      <div className="form">
        <h3 className="dynamic__subgroup__heading">Education</h3>
        {educations?.map((education, idx) => (
          <div className="dynamic__subgroup" key={idx}>
            {idx !== 0 && (
              <span
                className="delete__subgroup__btn"
                onClick={() => removeEducation(idx)}
              >
                <RemoveCircleIcon />
              </span>
            )}

            <div className="group">
              <label>Title of Degree</label>
              <input
                type="text"
                placeholder="e.g. BS"
                name="title"
                onChange={(e) => onChangeForEdu(e, idx)}
                value={education.title}
              />
              {eduErrors[idx]?.title && (
                <p className="error__para">{eduErrors[idx].title}</p>
              )}
            </div>
            <div className="group">
              <label>Name of Institution</label>
              <input
                type="text"
                placeholder="e.g. Oxford University"
                name="institution"
                onChange={(e) => onChangeForEdu(e, idx)}
                value={education.institution}
              />
              {eduErrors[idx]?.institution && (
                <p className="error__para">{eduErrors[idx].institution}</p>
              )}
            </div>
            <div className="degree__span__group">
              <div className="group">
                <label>Start Year</label>
                {/* <input type="text" placeholder="2020" /> */}
                <div>
                  <YearPicker
                    onChange={(val) => handleEduStartYear(val, idx)}
                    name="startYear"
                    value={education.startYear}
                  />
                </div>
                {isEditing && <p>{education?.startYear}</p>}
                {eduErrors[idx]?.startYear && (
                  <p className="error__para">{eduErrors[idx].startYear}</p>
                )}
              </div>
              <div className="group">
                <label>End Year</label>
                {/* <input type="text" placeholder="2022" /> */}
                <div>
                  <YearPicker
                    onChange={(val) => handleEduEndYear(val, idx)}
                    name="endYear"
                    value={education.endYear}
                  />
                </div>
                {isEditing && <p>{education?.endYear}</p>}
                {eduErrors[idx]?.endYear && (
                  <p className="error__para">{eduErrors[idx].endYear}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <button className="add__more__btn" onClick={(e) => addEducation()}>
          +Add More
        </button>

        <h3 className="dynamic__subgroup__heading">Experience</h3>
        {experiences?.map((experience, idx) => (
          <div className="dynamic__subgroup" key={idx}>
            <span
              className="delete__subgroup__btn"
              onClick={() => removeExperience(idx)}
            >
              <RemoveCircleIcon />
            </span>
            <div className="group">
              <label>Title</label>
              <input
                type="text"
                placeholder="e.g. BS"
                name="title"
                onChange={(e) => onChangeForExp(e, idx)}
                value={experience.title}
              />
              {expErrors[idx]?.title && (
                <p className="error__para">{expErrors[idx].title}</p>
              )}
            </div>
            <div className="group">
              <label>Firm Name</label>
              <input
                type="text"
                placeholder="e.g. Oxford University"
                name="firm"
                onChange={(e) => onChangeForExp(e, idx)}
                value={experience.firm}
              />
              {expErrors[idx]?.firm && (
                <p className="error__para">{expErrors[idx].firm}</p>
              )}
            </div>
            <div className="degree__span__group">
              <div className="group">
                <label>Tenure Start Year</label>
                <div>
                  <YearPicker
                    onChange={(val) => handleExpStartYear(val, idx)}
                    name="startYear"
                    value={experience.startYear}
                  />
                </div>
                {isEditing && <p>{experience?.startYear}</p>}
                {expErrors[idx]?.startYear && (
                  <p className="error__para">{expErrors[idx].startYear}</p>
                )}
              </div>
              <div className="group">
                <label>Tenure End Year</label>
                <div>
                  <YearPicker
                    onChange={(val) => handleExpEndYear(val, idx)}
                    name="endYear"
                    value={experience.endYear}
                  />
                </div>
                {isEditing && <p>{experience?.endYear}</p>}
                {expErrors[idx]?.endYear && (
                  <p className="error__para">{expErrors[idx].endYear}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <button className="add__more__btn" onClick={(e) => addExperience()}>
          +Add More
        </button>
        <h3 className="dynamic__subgroup__heading">Portfolio</h3>
        {portfolioItems?.map((item, idx) => (
          <div className="dynamic__subgroup" key={idx}>
            <span
              className="delete__subgroup__btn"
              onClick={() => removePortfolioItem(idx)}
            >
              <RemoveCircleIcon />
            </span>
            <div className="group">
              <label>Title of the Case</label>
              <input
                type="text"
                placeholder="e.g. Murder "
                name="title"
                onChange={(e) => onChangeForPortfolio(e, idx)}
                value={item.title}
              />
              {portfolioErrors[idx]?.title && (
                <p className="error__para">{portfolioErrors[idx].title}</p>
              )}
            </div>
            <div className="group">
              <label>Description</label>
              <textarea
                placeholder="write description of your case here... "
                name="description"
                onChange={(e) => onChangeForPortfolio(e, idx)}
                value={item.description}
              />
              {portfolioErrors[idx]?.description && (
                <p className="error__para">
                  {portfolioErrors[idx].description}
                </p>
              )}
            </div>
          </div>
        ))}
        <button className="add__more__btn" onClick={(e) => addPortfolioItem()}>
          +Add More
        </button>

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
            Save and Continue
          </button>
        </div> */}
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

export default ProfessionalStep;

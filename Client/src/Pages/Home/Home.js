import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BrowseByCategories from "./BrowseByCategories";
import OurTopRatedLawyers from "./OurTopRatedLawyers";
import Joinlawyer from "./Joinlawyer";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  useEffect(() => {
    if (!currentUser?.isProfileCompleted && currentUser?.userType == "lawyer") {
      navigate("/complete-profile-information");
    }
  }, []);
  return (
    <>
     
        <Navbar />
        <HeroSection />
        <BrowseByCategories />
        <OurTopRatedLawyers />
        <Joinlawyer/>
        <Footer/>
      
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Pages/LoginForm/LoginForm";
import NotFound from "./Components/404/NotFound";
import Home from "./Pages/Home/Home";
import SearchLawyers from "./Pages/SearchLawyers/SearchLawyers";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Components/Loading/Loading";
import Account from "./Pages/Account/Account";
import CompleteProfileInformation from "./Pages/CompleteProfileInformation/CompleteProfileInformation2";
import MessengerScreen from "./Pages/Messages/MessengerScreen";
import BookAppointment from "./Pages/BookAppointment/BookAppointment3";
import EditAppointment from "./Pages/EditAppointment/EditAppointment";
import Appointments from "./Pages/Appointments/Appointments";
import VideoChat from "./Pages/VideoChat/VideoChat";
import Profile from "./Pages/Profile/Profile2";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import RecoverPassword from "./Pages/ForgotPassword/RecoverPassword";
import LawyerDashboard from "./Pages/LawyerDashboard/LawyerDashboard";
import NNavbar from "./Pages/Home/Navbar";
import Barcode from "./Pages/Barcode/Barcode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<LoginForm />} />

        <Route path="/signup" exact element={<LoginForm />} />

        <Route path="/lawyers/:category" exact element={<SearchLawyers />} />

        <Route path="/lawyers" exact element={<SearchLawyers />} />

        <Route exact path="/account" element={<PrivateRoute />}>
          <Route path="/account" exact element={<Account />} />
        </Route>
        <Route path="/barcode" exact element={<Barcode />} />
        <Route
          path="/complete-profile-information"
          exact
          element={<CompleteProfileInformation />}
        />
        <Route exact path="/messages" element={<PrivateRoute />}>
          <Route path="/messages" exact element={<MessengerScreen />} />
        </Route>
        <Route
          exact
          path="/book-appointment/:lawyerId"
          element={<PrivateRoute />}
        >
          <Route
            path="/book-appointment/:lawyerId"
            exact
            element={<BookAppointment />}
          />
        </Route>
        <Route
          exact
          path="/edit-appointment/:appointmentId"
          element={<PrivateRoute />}
        >
          <Route
            path="/edit-appointment/:appointmentId"
            exact
            element={<EditAppointment />}
          />
        </Route>
        <Route
          exact
          path="/appointments/:subCategory"
          element={<PrivateRoute />}
        >
          <Route
            path="/appointments/:subCategory"
            exact
            element={<Appointments />}
          />
        </Route>
        <Route
          path="/email-verification/:userId/:uniqueString"
          exact
          element={<VerifyEmail />}
        />
        <Route path="/verify-your-account" exact element={<VerifyEmail />} />
        {/***here types are email set and account verified */}
        <Route exact path="/appointments" element={<PrivateRoute />}>
          <Route path="/appointments" exact element={<Appointments />} />
        </Route>
        <Route exact path="/profile/:lawyerId" element={<PrivateRoute />}>
          <Route path="/profile/:lawyerId" exact element={<Profile />} />
        </Route>
        <Route exact path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" exact element={<Profile />} />
        </Route>
        <Route
          path="/recover-password/:userId/:uniqueString"
          exact
          element={<RecoverPassword />}
        />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route
          exact
          path="/video-chat/:appointmentId"
          element={<PrivateRoute />}
        >
          <Route path="/video-chat/:appointmentId" element={<VideoChat />} />
        </Route>

        <Route exact path="/dashboard/:sub_url" element={<LawyerDashboard />} />
        <Route exact path="/dashboard" element={<LawyerDashboard />} />
        <Route exact path="/" element={<Home />} />
        {/* <PrivateRoute path="/" exact component={Home} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

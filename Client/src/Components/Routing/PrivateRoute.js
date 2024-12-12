import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;

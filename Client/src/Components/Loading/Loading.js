import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";
export default function Loading() {
  return (
    <div className="spinner__container">
      <Spinner animation="border" variant="success" />
    </div>
  );
}

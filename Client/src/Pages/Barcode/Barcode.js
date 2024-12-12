import React, { useEffect, useState } from "react";
import "./Barcode.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

function Barcode() {
  const [scanResult, setScanResult] = useState(null);
  const params = useParams();

  // Access the currentUser from the Redux state
  const currentUser = useSelector((state) => state.loginUserReducer.currentUser);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setScanResult(result);
      // Send the scan result to the server
      saveScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const saveScanResult = async (result) => {
    console.log("Saving scan result:", result); // Debugging statement

    try {
      if (currentUser && currentUser.id) {
        console.log("User ID and name:", currentUser.id,currentUser.name); // Log the userId in the frontend console

        const response = await axios.post("http://localhost:5000/api/barcode/", {
          result,
          userId: currentUser.id,
          name:currentUser.name,
        });
        console.log("Scan result saved:", response.data.insertedId);
      } else {
        console.log("User is not logged in or user ID is not available.");
      }
    } catch (error) {
      console.error("Error saving scan result:", error);
    }
  };



  return (
    <div className="main">
      <h3 className="barheading"> Barcode Scanner</h3>
      <h4 className="barsubheading">Scan your barcode here! </h4>
      {scanResult ? (
        <div>
          <p>
            Success! Scan result: <a href={scanResult}>{scanResult}</a>
          </p>
          <button
            className="btn"
            onClick={() =>
              (window.location.href = "/complete-profile-information")
            }
          >
            Complete your information
          </button>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default Barcode;

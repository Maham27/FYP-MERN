import React, { useState, useEffect, useContext } from "react";

import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../SocketContext";
import "./VideoChat.css";
import api from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";

const VideoCall = () => {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const { addUser, me, callEnded, leaveCall, setMe } =
    useContext(SocketContext);

  const params = useParams();
  const appointmentId = params.appointmentId;
  const [receiver, setReceiver] = useState();
  const [appointment, setAppointment] = useState();
  const [receiverId, setReceiverId] = useState();

  useEffect(() => {
    api.get(`/appointment/getByAppointmentId/${appointmentId}`).then((res) => {
      setAppointment(res.data);
      let idOfReceiver =
        currentUser.userType === "lawyer"
          ? res.data.clientId
          : res.data.lawyerId;
      setReceiverId(idOfReceiver);
      let rec =
        currentUser.userType === "lawyer" ? res.data.client : res.data.lawyer;
      setReceiver(rec);
      // setMe(currentUser?.id);
      // api
      //   .get(
      //     "http://localhost:5000/api/users/getUserBy?userId=" + idOfReceiver
      //   )
      //   .then((res) => setReceiver(res.data[0]))
      //   .catch((error) => console.error(error));
    });
  }, [appointmentId]);

  useEffect(() => {
    //adding socket user
    console.log("me>>>>>>>>>>> ", me);
    addUser(currentUser?.id);
  }, [currentUser]);
  useEffect(() => {
    console.log(
      
      receiver?.name,
      receiverId,
      receiver?.userType
    );
   
  }, [receiver]);

  return (
    <div className="video__call__container">
      {/* <div className="video__call__navbar">
        <h3>Discuss your health face to face .</h3>
      </div> */}
      <VideoPlayer />
      <Sidebar
        receiverId={receiverId}
        receiverName={receiver?.name}
        receiverType={receiver?.userType}
        appointmentId={appointmentId}
      ></Sidebar>
      <Notifications />
    </div>
  );
};

export default VideoCall;

// const videoCall = () => {
//   return (
//     <div>
//       <Navbar />
//       <VideoPlayer />
//       <Options>
//         <Notifications />
//       </Options>
//     </div>
//   );
// };

// export default videoCall;

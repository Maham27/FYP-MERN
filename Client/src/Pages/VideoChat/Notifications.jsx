import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";


const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  useEffect(() => {
    console.log("call.isReceiving Call>>>", call.isReceivingCall);
  }, [call]);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="video__call__notification__box">
          <h1>{call.name} is calling:</h1>
          <button className="video__call__answerCall__btn" onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;

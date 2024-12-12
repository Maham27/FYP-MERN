import React, { useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";

//import React, { useContext } from 'react';

//import { SocketContext } from '../Context';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  // console.log("name", name);
  // console.log("callAccepted", callAccepted);
  // console.log("myVideo", myVideo);
  // console.log("userVideo", userVideo);
  //console.log("callEnded", callEnded);
  //console.log("stream>>>>>>>>>>>>>>>>>>>>>>>>", stream);
  // console.log("call", call);
  useEffect(() => {
    console.log("call.name , name >", call.name, name);
  }, [name, call]);
  return (
    <div className="video__call__videoplayer__container">
      {stream && (
        <div className="screen self">
          <video playsInline muted ref={myVideo} autoPlay />
          <h5>{name || "Name"}</h5>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className="screen">
          <video playsInline ref={userVideo} autoPlay />
          <h5>{call.name || "Name"}</h5>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

// const VideoPlayer = () => {
//     const { callAccepted, myVideo, userVideo, callEnded, stream} = useContext(SocketContext);

//     return (
//         <div>
//             { stream && (
//             <video playsInline muted ref={myVideo} autoPlay />
//             )}

//             { callAccepted && !callEnded && (
//             <video playsInline ref={userVideo } autoPlay />
//             )}
//         </div>
//     )
// }

//export default VideoPlayer

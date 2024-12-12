// import React, {createContext, useState, useRef, useEffect} from "react";
// import {io} from 'socket.io-client';
// import Peer from 'simple-peer';

// const SocketContext = createContext();

// const socket = io('http://localhost:5000');
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:8990");
//const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
    socket.on("endCall", (res) => {
      console.log("response of end call >>>> ", res);
      if (res === true) {
        setCallEnded(true);
      }
    });
  }, [name]);
  const addUser = (id) => {
    console.log("socketContext>>>> ", id);
    socket.emit("addUser", id);
    console.log("after socketContext");
  };
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    console.log("id of receiver to be called>>>", id);
    try {
      peer.on("signal", (data) => {
        console.log("data in peer>>> ", data);
        console.log("me>>> ", me);
        console.log("name>> ", name);
        socket.emit("callUser", {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });
    } catch (err) {
      console.log("error while calling User>>> ", err);
    }

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = (receiverId) => {
    setCallEnded(true);

    connectionRef.current.destroy();
    socket.emit("endCall", { receiverId: receiverId });

    // window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        addUser,
        setMe,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };

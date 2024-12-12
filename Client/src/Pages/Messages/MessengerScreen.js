import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";

import bootstrap from "react";
import ConversationsBox from "../../Components/ConversationBox/ConversationsBox";
import ChatBox from "../../Components/ChatBox/ChatBox";
import "./MessengerScreen.css";
import { io } from "socket.io-client";
import api from "../../utils/api";
import NNavbar from "../Home/Navbar";

export default function MessengerScreen({ isLawyer }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const userstate = useSelector((state) => state.loginUserReducer);
  const createConversationState = useSelector(
    (state) => state.createConversationReducers
  );
  const socket = useRef();
  const { currentUser } = userstate;
  const { receiverToCreateConv } = createConversationState;
  const [refresher, setRefresher] = useState();
  // console.log(currentUser);
  console.log("testinggggggggggggggggggggggggg");
  useEffect(() => {
    api
      .get(
        `/conversations/${currentUser?.id ? currentUser?.id : currentUser?._id}`
      )
      .then((res) => {
        console.log("conversaTIONS>>>>>>>,", res.data);
        setConversations(res.data);
        let allConv = res.data;
        allConv.map((conv) => {
          api.get("/messages/" + conv?._id).then((res) => {
            if (res.data.length === 0) {
              api.delete(`/conversations/delete/${conv?._id}`);
            }
          });
        });
        setConversations(allConv);
      })
      .catch((err) => console.log(err));
  }, [refresher]);

  /****creating conversation */
  useEffect(() => {
    // console.log("receiverToCreateConv[0]>>", receiverToCreateConv[0]);
    if (
      receiverToCreateConv[0]?.receiverName &&
      receiverToCreateConv[0]?.receiverId
    ) {
      const { receiverName, receiverId } = receiverToCreateConv[0];
      console.log("receiver id >> ", receiverId);
      api
        .get(`/conversations/find/${currentUser?.id}/${receiverId}`)
        .then((res) => {
          if (res.data == null) {
            /** */
            api
              .get(`/user/getUserById/${receiverId}`)
              .then((res4) => {
                if (res4.data) {
                  console.log("res4 receiver data", res4.data);
                  let receiverData = {
                    id: res4.data._id,
                    name: res4.data.name,
                    email: res4.data.email,
                    profile: res4.data.profile,
                  };
                  api
                    .post(`/conversations/`, {
                      senderId: currentUser?.id,
                      receiverId: receiverId,
                      senderName: currentUser?.name,
                      receiverName: receiverName,
                      sender: currentUser,
                      receiver: receiverData,
                    })
                    .then((res) => {
                      setConversations((prev) => [...prev, res.data]);

                      setCurrentChat(res.data);

                      //for real time effect on receiver end

                      socket.current = io("ws://localhost:8990");
                      // console.log("socket current", socket.current);
                      socket.current.emit("sendConversation", {
                        conversationId: res.data._id,
                        senderId: currentUser?.id,
                        receiverId: receiverId,
                        senderName: currentUser?.name,
                        receiverName: receiverName,
                      });
                    });
                }
              })
              .catch((err) => console.log(err));
            /** */
          } else {
            setCurrentChat(res.data);
          }
          // console.log(res.data);
        });
    }
    //console.log("conversations>>> ", conversations);
  }, []);

  const setTheCurrentChat = (conversation) => {
    setCurrentChat(conversation);
    //console.log("current chat>>", currentChat);
  };
  const [showConversation, setShowConversation] = useState(true);
  const [showChat, setShowChat] = useState(true);
  useEffect(() => {
    let width = window.innerWidth;
    if (window.innerWidth < 768) {
      setShowChat(false);
      setShowConversation(true);
    }
  }, []);

  return (
    <>
      {currentUser?.userType == "client" && (
        <div style={{ padding: "0px 20px" }}>
          <NNavbar />
        </div>
      )}

      <div className={isLawyer ? "messenger lawyer__screen" : "messenger"}>
        {showConversation && (
          <ConversationsBox
            currentUser={currentUser}
            conversations={conversations}
            setTheCurrentChat={setTheCurrentChat}
            setConversations={setConversations}
            refresher={refresher}
            setRefresher={setRefresher}
            socket={socket}
            setShowChat={setShowChat}
            setShowConversation={setShowConversation}
            currentChat={currentChat}
          />
        )}
        {showChat && (
          <ChatBox
            currentUser={currentUser}
            currentChat={currentChat}
            refresher={refresher}
            setRefresher={setRefresher}
            socket={socket}
            setShowConversation={setShowConversation}
            setShowChat={setShowChat}
          />
        )}
      </div>
    </>
  );
}

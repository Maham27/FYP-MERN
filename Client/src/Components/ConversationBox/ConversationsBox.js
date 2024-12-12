import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import bootstrap from "react";

import Conversation from "./Conversation";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { io } from "socket.io-client";

export default function ConversationsBox({
  currentUser,
  conversations,
  setTheCurrentChat,
  setConversations,
  refresher,
  setRefresher,
  socket,
  setShowChat,
  setShowConversation,
  currentChat,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  useEffect(() => {
    // const unm = localStorage.getItem("unreadMsgsCount")
    //   ? JSON.parse(localStorage.getItem("unreadMsgsCount"))
    //   : null;
    localStorage.setItem(
      "unreadMsgsCount",
      JSON.stringify(unreadMessagesCount)
    );
  }, [unreadMessagesCount, currentChat]);

  //console.log("conversations>>> ", conversations);
  useEffect(() => {
    socket.current = io("ws://localhost:8990");
    socket.current.on("getConversation", (data) => {
      //console.log("data from get conversation>>> ", data);
      let temp_conversation = {
        _id: data.conversationId,
        members: [data.senderId, data.receiverId],
        membersNames: [data.senderName, data.receiverName],
      };
      if (temp_conversation !== null) {
        setConversations((prev) => [...prev, temp_conversation]);
      }
    });
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", currentUser?.id);
    socket.current.on("getUsers", (users) => {
      // console.log("socket users>>> ", users);
    });
  }, []);
  useEffect(() => {
    console.log("search Term>>>>>>>", searchTerm);
  }, [searchTerm]);

  return (
    <div className="conversations__box">
      <div className="user__info">
        <img
          src={
            currentUser?.profile
              ? currentUser?.profile
              : "https://cdn1.iconfinder.com/data/icons/man-user-human-avatar-profile-business-person/100/03-1Advocate-512.png"
          }
          alt="Avatar"
          class="avatar"
        />
        <h2>{currentUser?.name}</h2>
      </div>
      <div className="header">
        <div className="header__title">All Conversations</div>
        <div className="header__search">
          <input
            type="text"
            name="searchConversations"
            id="searchConversations"
            placeholder="Search Chat..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              //console.log("searching....");
            }}
          />
        </div>
      </div>
      <div className="conversations">
        {conversations &&
          conversations
            .filter((val) => {
              let ReceiverName = val?.membersNames.find(
                (member) => member !== currentUser?.name
              );
              console.log("val testing", val);
              console.log();
              if (searchTerm === "") {
                return val;
              } else if (
                ReceiverName.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .sort(function (a, b) {
              return new Date(b.updatedAt) - new Date(a.updatedAt);
            })

            .map((c) => (
              <Conversation
                currentUser={currentUser}
                conversation={c}
                setTheCurrentChat={setTheCurrentChat}
                refresher={refresher}
                setRefresher={setRefresher}
                setShowChat={setShowChat}
                setShowConversation={setShowConversation}
                unreadMessagesCount={unreadMessagesCount}
                setUnreadMessagesCount={setUnreadMessagesCount}
              />
            ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function Conversation({
  currentUser,
  conversation,
  setTheCurrentChat,
  refresher,
  setRefresher,
  setShowChat,
  setShowConversation,
  unreadMessagesCount,
  setUnreadMessagesCount,
}) {
  const navigate = useNavigate();
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const [receiver, setReceiver] = useState({});
  useEffect(() => {
    setUnreadMessagesCount(unreadMessagesCount + unreadMsgCount);
  }, [unreadMsgCount]);
  useEffect(() => {
    conversation?.membersData.forEach((user) => {
      if (user.id !== currentUser.id) {
        setReceiver(user);
        console.log("receiverrrrrrrrrrrrrrr  in conversation", user);
      }
    });
  }, []);
  useEffect(() => {}, [unreadMsgCount]);

  useEffect(() => {
    console.log("inner refreshing");
    try {
      api.get("/messages/" + conversation?._id).then((res) => {
        console.log("rola>>> ", res?.data);
        let count = 0;
        const messages = res.data;
        messages.map((message) => {
          //console.log("userId> ", currentUser.id);
          // console.log("sender> ", message.sender);
          //console.log("isReceived> ", message.isReceived);
          console.log("currentUser.id", currentUser?._id);
          console.log("message.sender", message.sender);
          if (
            currentUser.id !== message.sender &&
            message.isReceived === false
          ) {
            count++;
          }
        });
        setUnreadMsgCount(count);
        console.log("count>>> ", count);
      });
    } catch (err) {
      console.log(err);
    }
  }, [conversation, currentUser, refresher]);

  const deleteConversation = () => {
    if (
      window.confirm(
        "It will be deleted for everyone. Do you still want to delete?"
      ) == true
    ) {
      // alert("goood");

      api
        .delete(`/conversations/delete/${conversation?._id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));

      setTheCurrentChat(null);
      setRefresher(Math.floor(Math.random() * 78));
      navigate("/");
      navigate("/messages");
      setTimeout(() => {
        setTheCurrentChat(null);
        setRefresher(Math.floor(Math.random() * 78));
      }, 1000);
    }
  };
  const setCurrentChat = () => {
    setTheCurrentChat(conversation);
    api
      .get("/messages/" + conversation?._id)
      .then((res) => {
        console.log("response 1> ", res.data);
        let messages = res.data;
        if (res.data) {
          setUnreadMsgCount(0);
        }
        messages.map((message) => {
          const data = {
            messageId: message._id,
            isReceived: true,
          };
          api.put(`/messages/update`, data);
        });

        // console.log("message>>>>", message);
      })
      .catch((err) => console.log);
  };
  return (
    <div
      className="conversation"
      onClick={() => {
        setCurrentChat();
        if (window.innerWidth < 768) {
          setShowChat(true);
          setShowConversation(false);
        }
      }}
      style={{ position: "relative" }}
    >
      <img
        src={
          receiver?.profile
            ? receiver?.profile
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeQ-HkOk0nyWwdR6GNhI19KyuIDOyg-_w_tQ&usqp=CAU"
        }
        alt="Avatar"
        class="avatar"
      />
      <h3>
        {conversation?.membersNames[0] === conversation?.membersNames[1]
          ? conversation?.membersNames[0]
          : conversation?.membersNames.find(
              (member) => member !== currentUser?.name
            )}
      </h3>
      <IconButton onClick={deleteConversation}>
        <DeleteIcon />
      </IconButton>
      {unreadMsgCount > 0 ? (
        <span className="unreadMsgCount">{unreadMsgCount}</span>
      ) : (
        <></>
      )}
    </div>
  );
}

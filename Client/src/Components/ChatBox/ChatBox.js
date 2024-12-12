import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import bootstrap from "react";
import { IconButton } from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import { io } from "socket.io-client";
import { format } from "timeago.js";
import IosShareIcon from "@mui/icons-material/IosShare";
import axios from "axios";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import api from "../../utils/api";

export default function ChatBox({
  currentUser,
  currentChat,
  refresher,
  setRefresher,
  socket,
  setShowConversation,
  setShowChat,
}) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [messeges, setMesseges] = useState([]);
  const [receiver, setReceiver] = useState();
  const [receiverId, setReceiverId] = useState();
  const [receiverName, setReceiverName] = useState();
  const [isMsgSent, setIsMsgSent] = useState(false);
  const [showImgInput, setShowImgInput] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [showEmoji, setShowEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  useEffect(() => {
    currentChat?.membersData.forEach((user) => {
      if (user.id !== currentUser.id ? currentUser.id : currentUser._id) {
        setReceiver(user);
        console.log("receiverrrrrrrrrrrrrrrrrr in chat", user);
      }
    });
  }, []);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    //console.log(emojiObject);
    setInput(input + emojiObject.emoji);
    //alert(emojiObject);
  };

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        conversationId: currentChat?._id ? currentChat?._id : "12345",
        imgUrl: data.imgUrl,
        isReceived: data.isReceived,
      });

      //setRefresher(Math.floor(Math.random() * 56));
    });
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", currentUser?.id);
    socket.current.on("getUsers", (users) => {
      //console.log("socket users>>> ", users);
    });
  }, []);
  useEffect(() => {
    //console.log("arrival message>>> ", arrivalMessage);
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMesseges((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const idOfReceiver = currentChat?.members.find(
      (member) => member !== currentUser?.id
    );
    setReceiverId(idOfReceiver);
    const nameOfReceiver =
      currentChat?.membersNames[0] === currentChat?.membersNames[1]
        ? currentChat?.membersNames[0]
        : currentChat?.membersNames.find(
            (member) => member !== currentUser?.name
          );
    setReceiverName(nameOfReceiver);
  }, [currentChat]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [currentUser]);

  useEffect(() => {
    api
      .get(`/messages/${currentChat?._id}`)
      .then((res) => setMesseges(res.data))
      .catch((err) => console.log(err));

    api.put(`/conversations/update`, {
      conversationId: currentChat?._id,
    });
    setIsMsgSent(false);
  }, [currentChat, isMsgSent, refresher, arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messeges, currentChat]);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log(input);
    setShowEmoji(false);
    if (input === "") {
      return;
    }

    api
      .post("/messages/", {
        conversationId: currentChat?._id,
        sender: currentUser?.id,
        text: input,
        isReceived: false,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    //console.log("receiver at emitting>>>>>", receiverId);
    socket.current = io("ws://localhost:8990");
    socket.current.emit("sendMessage", {
      senderId: currentUser?.id,
      receiverId,
      text: input,
      imgUrl: "",
      isReceived: true,
    });
    //updating conversation updateAt
    const data = {
      conversationId: currentChat?._id,
    };
    api.put(`/conversations/update`, data);

    //send notifications

    api
      .post(`/notifications/`, {
        receiverId: receiverId,
        text: `${currentUser.name} sent you a message!.`,
        read: false,
      })
      .then((res) => {
        console.log("send message notification res>> ", res);
      })
      .catch((err) => {
        console.log(err);
      });

    setInput("");
    setIsMsgSent(true);
    setRefresher(Math.floor(Math.random() * 100));
  };
  const uploadImage = (e) => {
    e.preventDefault();
    setShowImgInput(false);
    setShowEmoji(false);

    const file = document.getElementById("inputGroupFile01").files;
    // console.log("file >>> ", file);
    if (!file[0]) {
      return;
    }
    //const formData = new FormData();
    try {
      // const formData = new FormData();
      // formData.append("file", file[0]);
      // formData.append("upload_preset", "kbnhxq6d");
      console.log("fileeeeeeeeeeeeeeeeeeee", file[0]);
      const data = new FormData();
      data.append("file", file[0]);
      data.append("upload_preset", "pauhtddz");
      // axios
      //   .post(
      //     "https://api.cloudinary.com/v1_1/dbjdalghs/image/upload",
      //     formData
      //   )
      fetch(
        "https://api.cloudinary.com/v1_1/dbjdalghs/image/upload",

        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setImgUrl();
          console.log("response from cloudinary>>>", res);
          const message = {
            sender: currentUser?.id,
            text: "",
            conversationId: currentChat?._id,
            imgUrl: res?.secure_url,
            isReceived: false,
          };
          api
            .post("/messages/", message)
            .then((res) => res.data)
            .catch((err) => console.log);
          setTimeout(() => {
            setMesseges([...messeges, message]);
          }, 500);

          socket.current = io("ws://localhost:8990");
          socket.current.emit("sendMessage", {
            senderId: currentUser?.id,
            receiverId,
            text: "",
            imgUrl: res.secure_url,
            isReceived: true,
          });
        })
        .catch((err) => console.log("error while cloudinary uploading", err));
    } catch (error) {
      console.log(error);
    }

    setRefresher(Math.floor(Math.random() * 56));
    // console.log("messages>>> ", messeges);

    //updating conversation updateAt
    const data = {
      conversationId: currentChat._id,
    };
    api.put(`/conversations/update`, data);
    /*******************/
    document.getElementById("inputGroupFile01").value = "";
    setIsMsgSent(true);
  };

  //console.log("current chat>>> ", currentChat);

  return (
    <div className="chat">
      {currentChat ? (
        <>
          <div className="chat__header">
            {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
            {window.innerWidth < 768 && (
              <IconButton
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setShowConversation(true);
                    setShowChat(false);
                  }
                }}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            )}
            {receiverName && (
              <img
                src={
                  receiver?.profile
                    ? receiver?.profile
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeQ-HkOk0nyWwdR6GNhI19KyuIDOyg-_w_tQ&usqp=CAU"
                }
                alt="Avatar"
                class="avatar"
              />
            )}
            {console.log("MAAAAAAAAAAAAAAAAAAAAAAAA", receiver)}
            <div className="chat__headerInfo">
              <h3>{receiverName}</h3>
            </div>
          </div>
          <div className="chat__body">
            {messeges.map((message) => (
              <p
                className={`chat__message ${
                  message.sender === currentUser.id && "chat__reciever"
                }`}
                ref={scrollRef}
              >
                <span className="chat__name">
                  {message?.sender === currentUser?.id
                    ? currentUser?.name
                    : receiverName}
                </span>
                {message.text ? (
                  message.text
                ) : (
                  <a href={message.imgUrl}>
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        cursor: "pointer",
                      }}
                      className="messageImg"
                      src={message?.imgUrl}
                    />
                  </a>
                )}
                <span className="chat__timestamp">
                  {format(message?.createdAt)}
                </span>
              </p>
            ))}
          </div>
          {showImgInput === false ? (
            <div className="chat__footer">
              <IconButton className="emojiBtn" style={{ width: "maxContent" }}>
                <MoodIcon onClick={() => setShowEmoji(true)} />
              </IconButton>
              <div className="form">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message"
                  type="text"
                />
                <button className="sendMsgBtn" onClick={(e) => sendMessage(e)}>
                  Send a message
                </button>
                <IconButton
                  variant="contained"
                  className="showImgInputBtn"
                  onClick={() => setShowImgInput(true)}
                >
                  <PhotoCameraBackIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            <div className="sendImageBox chat__footer2">
              <div className="form">
                <input
                  type="file"
                  name="file"
                  className="form-control-file"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  /*onChange={onChangeFile}*/
                />

                <IconButton
                  onClick={(e) => uploadImage(e)}
                  variant="contained"
                  class="form_submit_btn"
                >
                  Upload Image
                  <IosShareIcon />
                </IconButton>
              </div>
            </div>
          )}
          {showEmoji && (
            <div>
              <Picker
                onEmojiClick={onEmojiClick}
                skinTone={"SKIN_TONE_NEUTRAL"}
                pickerStyle={{
                  width: "100%",
                  backgroundColor: "rgb(151, 206, 206)",
                }}
                disableSearchBar
              />
            </div>
          )}
        </>
      ) : (
        <span className="nochat-text">
          Open a conversation to start a chat.
        </span>
      )}

      {/******************************** */}
    </div>
  );
}

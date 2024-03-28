import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import scrollToBottom from 'react-scroll-to-bottom'

const ChatMessage = ({
  text,
  logo,
  user,
  email,
  date,
  image,
  id,
  setText,
  setIsEditing,
  setEditingMessageId,
  messages,
  setMessages,
  setDeleteForMe,
  deleteForMe
}) => {
  const jsDate = date.toDate();

  const options = { hour: "numeric", minute: "numeric" };
  const formattedTime = new Intl.DateTimeFormat("default", options).format(
    jsDate
  );

  const handleDeleteForEveryOne = async () => {
    console.log("deleted", id);
    await deleteDoc(doc(db, "message", id));
  };

  const handleEditForEveryone = async () => {
    console.log("edited", id);
    setIsEditing(true);
    setEditingMessageId(id);
    setText(text);
  };

  const handleDeleteForMe = () => {
    if (auth.currentUser && auth.currentUser.photoURL === user.photoURL) {
      const updatedMessages = messages?.map((message) =>
      message.id === id ? { ...message, deleted: true } : message
    );
      
      setMessages(updatedMessages);
      setDeleteForMe((prev) => [...prev, id]);
    } else {
      console.log("not a user");
    }
  };

  return (
  
    <div
      className={`d-flex justify-content-${
        user.email === email ? "end" : "start"
      }`}
    >
      {user.email === email ? (
        <>
          <div className="message-right d-flex align-items-center column-gap-4">
            {image ? (
              <>
                <div className="mess-wrapper d-flex align-items-center gap-3">
                  <div className="d-flex flex-column gap-4">
                    <i
                      title="Delete for Everyone"
                      class="fa-solid fa-trash trash"
                      onClick={handleDeleteForEveryOne}
                    ></i>
                  </div>
                  <div className="d-flex  flex-column">
                    <img
                      src={image}
                      alt="Chat message"
                      style={{ height: "150px" }}
                    />
                    <span
                      className="d-flex justify-content-end"
                      style={{ color: "#0f0101", fontWeight: 600 }}
                    >
                      <small>{formattedTime}</small>
                    </span>
                  </div>
                </div>
                <img
                  src={logo}
                  title={user.displayName}
                  alt="logo"
                  className="logo-icon"
                />
              </>
            ) : (
              <>
                <div
                  className="mess-wrapper d-flex align-items-center"
                  onClick={handleDeleteForMe}
                >
                  <div className="d-flex flex-column gap-4">
                    <i
                      title="Delete for everyone"
                      class="fa-solid fa-trash trash"
                      onClick={handleDeleteForEveryOne}
                    ></i>
                    <i
                      title="Edit Message"
                      onClick={handleEditForEveryone}
                      class="fa-solid fa-pen-to-square edit"
                    ></i>
                  </div>
                  <span className="message-text-right d-flex flex-column">
                    {text}{" "}
                    <span
                      className="d-flex justify-content-end"
                      style={{ color: "#0f0101", fontWeight: 600 }}
                    >
                      <small>{formattedTime}</small>
                    </span>
                  </span>
                </div>
                <img
                  src={logo}
                  title={user.displayName}
                  alt="logo"
                  className="logo-icon"
                />
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="message-left d-flex align-items-center column-gap-4">
            {image ? (
              <>
                <img src={logo} alt="logo" className="logo-icon" />
                <div
                  className="mess-wrapper d-flex flex-row column-gap-4"
                  onClick={handleDeleteForMe}
                >
                  <div className="d-flex  flex-column">
                    <img
                      src={image}
                      alt="Chat message"
                      style={{ height: "150px" }}
                    />
                    <span
                      className="d-flex justify-content-end"
                      style={{ color: "#0f0101", fontWeight: 600 }}
                    >
                      <small>{formattedTime}</small>
                    </span>
                  </div>
                  <div className="d-flex flex-column justify-content-evenly">
                    <i
                      title="Delete for Everyone"
                      class="fa-solid fa-trash trash"
                      onClick={handleDeleteForEveryOne}
                    ></i>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <img src={logo} alt="logo" className="logo-icon" />
                <div
                  className="mess-wrapper d-flex align-items-center"
                  onClick={handleDeleteForMe}
                >
                  <span className="message-text-left">
                    {text}{" "}
                    <span
                      className="d-flex justify-content-end"
                      style={{ color: "#0f0101", fontWeight: 600 }}
                    >
                      <small>{formattedTime}</small>
                    </span>
                  </span>
                  <div className="d-flex flex-column gap-4">
                    <i
                      title="Delete for Everyone"
                      class="fa-solid fa-trash trash"
                      onClick={handleDeleteForEveryOne}
                    ></i>
                    
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
   
  );
};

export default ChatMessage;

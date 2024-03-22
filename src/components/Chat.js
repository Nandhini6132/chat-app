import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Chat = ({ user, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [inputImg, setInputImg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [deleteForMe, setDeleteForMe] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  const handleImageUpload = async (imageFile) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageURL = await getDownloadURL(storageRef);
    return imageURL;
  };

  const handleSubmit = async () => {
    const date = new Date();
    const messageData = {
      text,
      email: user.email,
      logo: user.photoURL,
      date,
      name: user.displayName,
    };

    setDeleteForMe((prev) => [...prev, messageData]);
    if (image) {
      const imageURL = await handleImageUpload(image);
      messageData.image = imageURL;
    }
    if (isEditing) {
      await updateDoc(doc(db, "message", editingMessageId), {
        text,
      });
      setIsEditing(false);
      setEditingMessageId(null);
    } else {
      await addDoc(collection(db, "message"), messageData);
    }

    setText("");
    setInputImg("");
    setImage('')
  };

  //get data from fb
  async function getData() {
    const q = query(collection(db, "message"));
    const snapshot = await getDocs(q);
    let updatedMessages = [];
    snapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id };
      if (!deleteForMe.includes(data.id)) {
        updatedMessages.push(data);
      }
    });
    updatedMessages.sort((a, b) => a.date - b.date);
    setMessages(updatedMessages);
  }

  useEffect(() => {
    getData();
  }, [text, image, handleSubmit]);

  const logout = () => {
    auth.signOut();
  };

  //image
  const triggerFileSelect = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setInputImg(URL.createObjectURL(file));
  };

  const handleCancelImage = () => {
    setInputImg("");
    setImage("");
  };

  return (
    <>
      <div
        className={` ${
          user
            ? "d-flex flex-row justify-content-between align-items-center ms-5 me-5"
            : "d-flex h-100 align-items-center flex-column justify-content-center"
        }`}
        style={user ? {} : { transform: "translate(10px, -20px)" }}
      >
        <h2 className={`text-light p-3 fs-${user ? "4" : 1}`}>
          {user ? "Chat App" : "Welcome to chat room"}
        </h2>
        <div className="d-flex flex-column">
          {user ? (
            ""
          ) : (
            <>
              <span className="text-light">
                click here to login and chat with your friend
              </span>
            </>
          )}{" "}
          <div>
            {" "}
            <button
              onClick={user ? logout : handleLogin}
              className={`btn btn-${user ? "danger" : "success"} mt-${
                user ? "1" : "4"
              }`}
            >
              {user ? "Logout" : " Login"}
            </button>
          </div>
        </div>
      </div>

      {user ? (
        <div className="container-fluid">
          {" "}
          <div className="row" style={{ height: "95%", padding: "" }}>
            {/* <div className="col-xl-3 col-lg-4 col-sm-3 col-2"></div> */}
            <div className="p-0">
              <div className=" col-12 p-0 p-lg-3 chat-message">
                {messages?.map?.((message) =>
                  !message.deleted ? (
                    <ChatMessage
                      key={message.id}
                      {...message}
                      user={user}
                      setText={setText}
                      setMessages={setMessages}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      editingMessageId={editingMessageId}
                      setEditingMessageId={setEditingMessageId}
                      deleteForMe={deleteForMe}
                      setDeleteForMe={setDeleteForMe}
                    />
                  ) : null
                )}
              </div>

              <div className="mt-4  input">
                <div className="input-wrapper">
                  {inputImg && (
                    <div className="d-flex gap-2" style={{ cursor: "pointer" }}>
                      <img
                        src={inputImg}
                        alt="Selected"
                        style={{ width: "300px", height: "100px" }}
                      />
                      <i
                        class="fa-solid fa-xmark"
                        onClick={handleCancelImage}
                      ></i>
                    </div>
                  )}
                  <div className="d-flex w-100">
                    <input
                      type="text"
                      className="form-control form"
                      placeholder="Enter MEssage"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />

                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <i
                      className="fa fa-image icon"
                      onClick={triggerFileSelect}
                    ></i>

                    <button className="btn btn-dark" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Chat;

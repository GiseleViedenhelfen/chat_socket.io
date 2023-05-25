import React, { useContext, useEffect, useState } from "react";
import OnlineUser from "../components/onlineUsers";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";
import ChatBody from "../components/ChatBody";
import socketIO from "socket.io-client";
import ChatContext from "../context/chatContext";
import "./Home.css";

const Homepage = () => {
  const { setSocket } = useContext(ChatContext)
  const [token, setToken] = useState("");
  const [user, setUser] = useState('');
  const connectToSocket = () => {
    const connectSocket = socketIO.connect("http://localhost:3001", {
      query: { token: token, userName: user },
    });
    setSocket(connectSocket)
  };

  useEffect(() => {
    if (!token) {
      const getToken = JSON.parse(localStorage.getItem("userName"));
      setToken(getToken.token);
      setUser(getToken.username)
    } else {
      connectToSocket();
    }
  }, [token]);

  return (
    <div className="chat">
      <div className="chat__nav">
        <OnlineUser />
      </div>
      <div className="chat__main">
        <ChatHeader />
        <ChatBody />
        <ChatFooter />      
      </div>
    </div>
  );
};

export default Homepage;

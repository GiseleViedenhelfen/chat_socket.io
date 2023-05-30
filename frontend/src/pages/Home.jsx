import React, { useContext, useEffect, useState } from "react";
import OnlineUsers from "../components/OnlineUsers";
import { useNavigate } from "react-router-dom";
import ChatBody from "../components/ChatBody";
import socketIO from "socket.io-client";
import ChatContext from "../context/chatContext";
import "./Home.css";

const Homepage = () => {
  const {currentUser, setSocket } = useContext(ChatContext)
  const [token, setToken] = useState("");
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const connectToSocket = () => {
    const connectSocket = socketIO.connect("http://localhost:3001", {
      query: { token: token, userName: user },
    });
    setSocket(connectSocket)
  };

  useEffect(() => {
    if (currentUser === null) {
      navigate('/')
    }
    else {
      if (!token) {
        const getToken = JSON.parse(localStorage.getItem("userName"));
        setToken(getToken.token);
        setUser(getToken.username)
      } else {
        connectToSocket();
      }
    }
  }, [token, currentUser]);

  return (
    <div className="chat">  
        <OnlineUsers/>
        <h2>clique em alguém para iniciar o chat</h2>
    </div>
  );
};

export default Homepage;

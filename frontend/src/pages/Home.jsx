import React, { useContext, useEffect, useState } from "react";
import OnlineUser from "../components/onlineUsers";
import ChatBody from "../components/chatBody";
import ChatFooter from "../components/chatFooter";
import socketIO from "socket.io-client";
import ChatContext from "../context/chatContext";

const Homepage = () => {
  const [messages, setMessages] = useState([]);
  const { socket, setSocket} = useContext(ChatContext)
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

  // socket.on('messageResponse', (data) => setMessages([...messages, data]));

  return (
    <div className="chat">
      {console.log("token estado", socket)}
      <OnlineUser />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter />
      </div>
    </div>
  );
};

export default Homepage;

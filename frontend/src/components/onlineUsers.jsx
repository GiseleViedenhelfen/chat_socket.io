import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../context/chatContext";

const OnlineUser = () => {
  const [users, setUsers] = useState([]);
  const [usersToChat, setUsersToChat] = useState([]);
  const { socket } = useContext(ChatContext);
  useEffect(() => {
    socket &&
      socket.on("onlineUsers", (onlineUsers) => {
        setUsers(onlineUsers);
      });
    const getUsersToChat = () => {
      const getCurrentUser = JSON.parse(localStorage.getItem("userName"));
      console.log(getCurrentUser);
      users.length > 0 &&
        setUsersToChat(
          users.filter((user) => user.name !== getCurrentUser.username)
        );
    };
    getUsersToChat();
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {usersToChat.map((user) => (
            <p key={user.token}>{user.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OnlineUser;

import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../context/chatContext";
import { useNavigate } from "react-router-dom";

const OnlineUsers = () => {
  const {users, setUsers, usersToChat, setUsersToChat} = useContext(ChatContext);
  const navigate = useNavigate();
  const {
    roomID,
    currentUser,
    avaibleRooms,
    setAvaibleRooms,
    socket,
    setCurrentUser,
    setSelectedUser,
    setRoomID
  } = useContext(ChatContext);
  useEffect(() => {
    socket &&
      socket.on("onlineUsers", (onlineUsers) => {
        setUsers(onlineUsers);
      });
    const getUsersToChat = () => {
      const getCurrentUser = JSON.parse(localStorage.getItem("userName"));
      users.length > 0 &&
        setUsersToChat(
          users.filter((user) => user.name !== getCurrentUser.username)
        );
    };
    usersToChat.length === 0 && setSelectedUser(null);
    getUsersToChat();
    createRooms();

  }, [socket, users]);

  const createRooms = () => {
    const getNames = users.map((user) => user.name);
    const combinations = getNames.sort().flatMap((name, index) =>
      getNames.slice(index + 1).map((otherName) => `${name}-${otherName}`)
    );
    setAvaibleRooms(combinations.sort());
  };
  const handleClick = (user) => {
    const sender = JSON.parse(localStorage.getItem("userName"));
    const receiver = user.name;
    const getRoom = avaibleRooms.filter(
      (room) => room.includes(sender.username) && room.includes(receiver)
    );
    setSelectedUser(user);
    setRoomID(getRoom[0])
    // navigate("/");
    navigate(`/home/${getRoom}`)
    socket.emit('joinPrivateRoom', getRoom, sender.username)
  };
  return (
    <div className="chat__sidebar">
      <div>
        <h4 className="chat__header">Usuários Online</h4>
        <ul className="chat__users">
          {usersToChat.map((user) => (
            <li key={user.token}>
              <button
                onClick={() => {
                  handleClick(user);
                }}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default OnlineUsers;

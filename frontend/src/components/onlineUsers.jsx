import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../context/chatContext";

const OnlineUser = () => {
  const [users, setUsers] = useState([]);
  const [usersToChat, setUsersToChat] = useState([]);
  const {
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
      setCurrentUser(getCurrentUser);
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
    const combinations = getNames.flatMap((name, index) =>
      getNames.slice(index + 1).map((otherName) => name + otherName)
    );
    setAvaibleRooms(combinations);
  };
  const handleClick = (user) => {
    const sender = currentUser.username;
    const receiver = user.name;
    const getRoom = avaibleRooms.filter(
      (room) => room.includes(sender) && room.includes(receiver)
    );
    setSelectedUser(user);
    setRoomID(getRoom)
    socket.emit('joinPrivateRoom', getRoom, currentUser)
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
export default OnlineUser;

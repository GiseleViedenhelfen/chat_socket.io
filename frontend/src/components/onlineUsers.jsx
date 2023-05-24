import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../context/chatContext";


const OnlineUser = () => {
  const [users, setUsers] = useState([]);
  const [usersToChat, setUsersToChat] = useState([]);
  const {selectedUser, socket, setCurrentUser, setSelectedUser } = useContext(ChatContext);
  useEffect(() => {
    socket &&
      socket.on("onlineUsers", (onlineUsers) => {
        setUsers(onlineUsers);
      });
    const getUsersToChat = () => {
      const getCurrentUser = JSON.parse(localStorage.getItem("userName"));
      setCurrentUser(getCurrentUser)
      users.length > 0 &&
        setUsersToChat(
          users.filter((user) => user.name !== getCurrentUser.username)
        );
    };
    getUsersToChat();
    // getMessages()
  }, [socket, users]);
  
  // const selectedUser = (targetUser) => {
  //   socket.emit('privateChat', { content: 'room', to: targetUser });
   
  // // socket.emit('privateChat', targetUser)
  // }
  // const getMessages = () => {
  //   socket &&
  //   socket.on('privateChat', (data) => {
  //     console.log(data);
  //   })
  // }


  return (
    <div className="chat__sidebar">
      <div>
        {console.log(users)}
        <h4 className="chat__header">Usuários Online</h4>
        <ul className="chat__users">
          {usersToChat.map((user) => (
            <li key={user.token}             
            >
              <button
              onClick={() => {setSelectedUser(user)}}>
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

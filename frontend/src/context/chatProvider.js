import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './chatContext';

export default function ChatProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [avaibleRooms, setAvaibleRooms] = useState(null);
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersToChat, setUsersToChat] = useState([]);

  const context = useMemo(() => ({
    roomID,
    chat,
    socket,
    currentUser,
    selectedUser,
    avaibleRooms,
    users,
    usersToChat,
    setSocket,
    setCurrentUser,
    setSelectedUser,
    setAvaibleRooms,
    setRoomID,
    setChat,
    setUsers,
    setUsersToChat,
  }), [socket, currentUser, selectedUser, roomID,
    avaibleRooms, chat, users, usersToChat, setSocket, setCurrentUser,
    setSelectedUser, setAvaibleRooms, setRoomID, setChat, setUsersToChat]);

  return (
    <ChatContext.Provider value={context}>
      {children}
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
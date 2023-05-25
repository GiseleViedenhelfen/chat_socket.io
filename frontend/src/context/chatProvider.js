import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './chatContext';

export default function ChatProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [roomID, setRoomID] = useState(null);
  const [avaibleRooms, setAvaibleRooms] = useState(null);
  const [chat, setChat] = useState([])
  const context = useMemo(() => ({
    roomID,
    chat,
    socket,
    currentUser,
    selectedUser,
    avaibleRooms,
    setSocket,
    setCurrentUser,
    setSelectedUser,
    setAvaibleRooms,
    setRoomID,
    setChat
  }), [socket, currentUser, selectedUser, roomID, avaibleRooms, chat]);

  return (
    <ChatContext.Provider value={ context }>
      { children }
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
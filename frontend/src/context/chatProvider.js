import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './chatContext';

export default function ChatProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [roomID, setRoomID] = useState(null)
  const context = useMemo(() => ({
    roomID,
    socket,
    currentUser,
    selectedUser,
    setSocket,
    setCurrentUser,
    setSelectedUser,
    setRoomID
  }), [socket, currentUser, selectedUser, roomID]);

  return (
    <ChatContext.Provider value={ context }>
      { children }
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
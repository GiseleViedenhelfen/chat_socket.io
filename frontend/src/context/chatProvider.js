import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './chatContext';

export default function ChatProvider({ children }) {

  const [socket, setSocket] = useState(null)

  const context = useMemo(() => ({

    socket,
    setSocket,
  }), [socket]);

  return (
    <ChatContext.Provider value={ context }>
      { children }
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
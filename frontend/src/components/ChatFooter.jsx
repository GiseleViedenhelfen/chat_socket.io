import React, { useState, useContext } from 'react';
import ChatContext from "../context/chatContext";

const ChatFooter = () => {
  const {socket,  currentUser, selectedUser } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {   
    if(message.trim() && socket) {
    socket.emit('privateChat', {
      content: message,
      to: selectedUser,
      from: currentUser
    });
  }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="message__form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message__input"
          value={message}
          onChange={({target}) => setMessage(target.value)}
        />
        <button
        type="button"
        className="send__button"
        onClick={handleSendMessage}
        disabled= {selectedUser === null}
        >ENVIAR</button>
      </form>
    </div>
  );
};

export default ChatFooter;
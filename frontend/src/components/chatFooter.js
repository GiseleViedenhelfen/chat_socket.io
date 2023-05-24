import React, { useState, useContext } from 'react';
import ChatContext from "../context/chatContext";

const ChatFooter = () => {
  const {socket,  currentUser, selectedUser, setRoomID } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {   
    if(message.trim() && socket) {
    // const roomToTalk = `${currentUser.username}${selectedUser.name}`
    // setRoomID(roomToTalk)
    socket.emit('privateChat', {
      content: message,
      to: selectedUser,
      // room: roomToTalk,
      from: currentUser
    });
  }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={({target}) => setMessage(target.value)}
        />
        <button
        type="button"
        className="sendBtn"
        onClick={handleSendMessage}
        >SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
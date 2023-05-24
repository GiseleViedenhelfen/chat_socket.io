import React, { useState, useContext } from 'react';
import ChatContext from "../context/chatContext";
const { v4: uuidv4 } = require('uuid');

const ChatFooter = () => {
  const { socket,  currentUser, selectedUser, setRoomID } = useContext(ChatContext);
  const [message, setMessage] = useState('');
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
  const handleSendMessage = () => {
    const generateRoom = () => uuidv4();
    const roomToTalk = generateRoom()

  if(message.trim() && socket) {
    setRoomID(roomToTalk)
    socket.emit('joinRoom', { content: message, to: selectedUser, room: roomToTalk });
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
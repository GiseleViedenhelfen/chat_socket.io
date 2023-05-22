import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
const ChatBody = ({ messages, socket }) => {
  const [userOnline, setUsersOnline] = useState([])
  const navigate = useNavigate();
  // useEffect(() => {
  //   socket.on('disconnect', (data) => setUsersOnline([...messages, data]));
  // }, [socket, messages]);
  const handleLeaveChat = () => {
 
    localStorage.removeItem('userName');
    navigate('/');
    // socket.on('logout', () => {
    //   socket.disconnect();
    // })
    // window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
         {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ChatBody;
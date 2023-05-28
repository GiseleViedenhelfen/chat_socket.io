import React, {useContext, useEffect, useState} from 'react';
import ChatContext from "../context/chatContext";
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import OnlineUsers from './OnlineUsers';
import { getMsgs, sendMsg } from '../localStorage/utils';

const ChatBody = () => {
  const {avaibleRooms, chat, setChat, roomID,socket, selectedUser } = useContext(ChatContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [on, setOn] = useState(false)
 
  useEffect(() => {
    const currentPath = window.location.pathname;
    const room =  currentPath.split('/')[currentPath.split('/').length - 1]
    setCurrentRoom(room);
    if (socket) { 
      if (!on) {
        setOn(true)
        socket.on('dataMessage',(data) =>{
        const sender = data.from;
        const receiver = data.to;
        const chatRoom = data.room
        const lastRoom = currentRoom
        const msg = `${sender}: ${data.content}`
          // sendMsg(msg, chatRoom)
        
      })
    }
    
    }
  

  }, [on, chat, socket])


getMsgs()
    
return(
  <div className="chat">
  <OnlineUsers />
  <div className="chat__main">
    <ChatHeader />
    {/* {filteredChat.length > 0 && filteredChat.map((message) => <p>{message}</p>)} */}
    <div>corpo</div>
    <ChatFooter />
    {/* {console.log('mensagem recebida', receivedmMessages)} */}
    {/* {chat.length > 0 && chat.map((message) => <p className='received__message'>{`${selectedUser?.name}: ${message}`}</p>)} */}
    {/* {console.log('mensagem enviada => ', sentedMessages)} */}
    {/* {chat.length > 0 && chat.map((message) => <p className='sented__message'>{`you: ${message}`}</p>)} */}
  </div>
  </div>
)
}

export default ChatBody;
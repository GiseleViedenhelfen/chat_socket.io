import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ChatContext from "../context/chatContext";
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import OnlineUsers from './OnlineUsers';
import { getMsgs, registerMsg } from '../localStorage/utils';

const ChatBody = () => {
  const {avaibleRooms, setChat, roomID,socket, selectedUser, chat } = useContext(ChatContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [on, setOn] = useState(false);
  const [render, setRender] = useState(false)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const room =  currentPath.split('/')[currentPath.split('/').length - 1]
    
    setCurrentRoom(room);
    if (socket) { 
      if (!on) {
        setOn(true)
        socket.on('dataMessage',(data) =>{   
        registerMsg(`${data.from}: ${data.content}`, data.room)
        setChat([...chat, data.content])
        console.log('111')
      })
      socket.on('receivedMessage', (message) => {
        setChat([...chat, message.content])
        registerMsg(`${message.from}: ${message.content}`, message.room)
        console.log('222')
      } )
    }  
    }
  

  }, [on, socket, chat, setChat])

  const filteredMessages = () => {
    const msgs =  getMsgs()
    if (typeof currentRoom === "string" && currentRoom in msgs) {
      console.log(msgs)
     const arrMsgs = msgs[currentRoom]
     return arrMsgs.map((msg) => <div>{msg}</div>)
    }
    return null
  }


 
return(
  <div className="chat">
  <OnlineUsers />
  <div className="chat__main">
    <ChatHeader />
    {/* {filteredChat.length > 0 && filteredChat.map((message) => <p>{message}</p>)} */}
    <div>corpo</div>
    {filteredMessages()}
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
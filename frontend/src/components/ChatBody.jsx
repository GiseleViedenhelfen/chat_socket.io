import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ChatContext from "../context/chatContext";
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import OnlineUsers from './OnlineUsers';
import { getMsgs, registerMsg } from '../localStorage/utils';

const ChatBody = () => {
  const {avaibleRooms, setChat, roomID,socket, selectedUser, chat } = useContext(ChatContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState({})
  const [on, setOn] = useState(false);
  const currentPath = window.location.pathname;
  
  useEffect(() => {
    if (currentPath) {
      const room =  currentPath.split('/')[currentPath.split('/').length - 1];
      const backupMsgs = getMsgs()
      setMessages(backupMsgs)
      if (room in backupMsgs) {
        setChat(backupMsgs[room])
      } else {
        backupMsgs[room] = []
        console.log(backupMsgs)
        setChat(backupMsgs[room])
      }

    }
  },[currentPath, setChat])


  useEffect(() => {

    const room =  currentPath.split('/')[currentPath.split('/').length - 1];
    setCurrentRoom(room);
    if (socket) { 
      if (!on) {
        setOn(true)
        socket.on('dataMessage',(data) =>{  
          const messages = getMsgs()
          const updatedChat = messages[room]
            setChat([...updatedChat, `${data.from}: ${data.content}`])
        registerMsg(`${data.from}: ${data.content}`, data.room)
        console.log('111')
      })
      socket.on('receivedMessage', (data) => {
        const messages = getMsgs()
        const updatedChat = messages[room]
          setChat([...updatedChat, `${data.from}: ${data.content}`])
        registerMsg(`${data.from}: ${data.content}`, data.room)
        console.log('222')
      } )
    }  
    }
  

  }, [on, socket, chat, setChat])


 
return(
  <div className="chat">
  <OnlineUsers />
  <div className="chat__main">
    <ChatHeader />
    {/* {filteredChat.length > 0 && filteredChat.map((message) => <p>{message}</p>)} */}
    <div>corpo</div>
    {chat.map((msg) => <div>{msg}</div>)}
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
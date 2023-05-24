import React, {useContext, useEffect, useState} from 'react';
import ChatContext from "../context/chatContext";

const ChatBody = () => {
  const {socket, currentUser, selectedUser } = useContext(ChatContext);
  const [roomInvite, setRoomInvite] = useState(false);
  const [receivedmMessages, setReceivedmMessages] = useState([])
  const [sentedMessages, setSentedMessages] = useState([])
  // const [sender, setSender] = useState(null)
  useEffect(() => {
    getMessages()
  }, [socket, sentedMessages, receivedmMessages])
  
      const getMessages = () => {
        if (socket) { 
         socket.on('receivedMessage', (data) => setReceivedmMessages([...receivedmMessages, data.content]))
          socket.on('sendedMessage', (data) => setSentedMessages([...sentedMessages, data.content]))
        }
      }
  
return(
  <div>
    <p>mensagens</p>
    {console.log('mensagem recebida', receivedmMessages)}
    {receivedmMessages.length > 0 && receivedmMessages.map((message) => <p>{`${selectedUser?.name}: ${message}`}</p>)}
    {console.log('mensagem enviada => ', sentedMessages)}
    {sentedMessages.length > 0 && sentedMessages.map((message) => <p>{`you: ${message}`}</p>)}
  </div>
)
}

export default ChatBody;
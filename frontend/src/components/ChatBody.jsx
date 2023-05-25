import React, {useContext, useEffect, useState} from 'react';
import ChatContext from "../context/chatContext";

const ChatBody = () => {
  const {avaibleRooms, chat, setChat, roomID,socket, selectedUser } = useContext(ChatContext);
  const [receivedmMessages, setReceivedmMessages] = useState([])
  const [sentedMessages, setSentedMessages] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)
  // const [separateRooms, setSeparateRooms] = useState(false)

  useEffect(() => {
    getMessages()
  }, [socket, sentedMessages, receivedmMessages])
  
      const getMessages = () => {
        if (avaibleRooms?.length > 0) {
          console.log(avaibleRooms);
          const chatContainer = avaibleRooms.reduce((result, item) => {
            result[item] = [];
            return result;
          }, {})
          setChat(chatContainer);
        }
        if (socket) { 
          socket.on('dataMessage', (data) =>{
            console.log(data);
            const sender = data.from;
            const receiver = data.to;
            // const separateUsers = data.room[0].split(/(?=[A-Z])/);
            // const checkRoom = separateUsers.includes(sender) && separateUsers.includes(receiver);
            // console.log(checkRoom);
            // console.log(currentRoom);
            // console.log(data.content);
           
          })
          // socket.on('sentedMessage', (data) => {
          //   const sender = data.from;
          //   const receiver = data.to;
          //   const separateUsers = data.room[0].split(/(?=[A-Z])/);
          //   const checkRoom = separateUsers.includes(sender) && separateUsers.includes(receiver);
          //   console.log(checkRoom);
          //   console.log(data.content);
          // })
        }
      }
  
return(
  <div className="chat__body">

    {/* {console.log('mensagem recebida', receivedmMessages)} */}
    {receivedmMessages.length > 0 && receivedmMessages.map((message) => <p className='received__message'>{`${selectedUser?.name}: ${message}`}</p>)}
    {/* {console.log('mensagem enviada => ', sentedMessages)} */}
    {sentedMessages.length > 0 && sentedMessages.map((message) => <p className='sented__message'>{`you: ${message}`}</p>)}
  </div>
)
}

export default ChatBody;
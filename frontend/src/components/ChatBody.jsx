import React, {useContext, useEffect, useState} from 'react';
import ChatContext from "../context/chatContext";

const ChatBody = () => {
  const {socket, currentUser, selectedUser } = useContext(ChatContext);
  const [roomInvite, setRoomInvite] = useState(false);
  const [sender, setSender] = useState(null)
  useEffect(() => {
    getMessages()
  }, [socket])
  
      const getMessages = () => {
        if (socket) { 
         socket.on('receivedMessage', (data) => {
            console.log('received message => ', data);
            // if (typeof data === String) {
            //   setRoomInvite(true);
            //   setSender(null);
            // } else {
            //   setRoomInvite(false);
            //   setSender(data.from);
            // }
          })
          socket.on('sendedMessage', (data) => {
            console.log('sended message => ',data);
          })
        }
      }
  
return(
  <div>
    <p>mensagens</p>
    {/* {[console.log(roomInvite), console.log(sender)] */}
    {/* } */}
    {roomInvite && <button>{`${sender} wants to talk to you!`}</button>}
  </div>
)
}

export default ChatBody;
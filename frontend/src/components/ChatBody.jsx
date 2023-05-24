import React, {useContext, useEffect, useState} from 'react';
import ChatContext from "../context/chatContext";

const ChatBody = () => {
  const { socket,  currentUser, selectedUser } = useContext(ChatContext);
  const [roomInvite, setRoomInvite] = useState(false);
  const [sender, setSender] = useState(null)
  useEffect(() => {

    const getMessages = () => {
      // console.log('teste');
      // socket &&
      // socket.on('receivedMessages', (data) => {
      //   console.log(data);
      // })
      if (socket) {
        socket.on('inviteToJoinRoom', (data) => {
          console.log(data);
          if (typeof data === String) {
            setRoomInvite(true);
            setSender(null);
          } else {
            setRoomInvite(false);
            setSender(data.from);
          }
        })
   
        // avaibleRoom ? setRoomInvite(true) && setSender('avaibleRoom.from'): setRoomInvite(false)
      }
    }
    getMessages()
  }, [socket])

return(
  <div>
    <p>mensagens</p>
    {[console.log(roomInvite), console.log(sender)]
    }
    {roomInvite && <button>{`${sender} wants to talk to you!`}</button>}
  </div>
)
}

export default ChatBody;
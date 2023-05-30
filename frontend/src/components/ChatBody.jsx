import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import ChatContext from "../context/chatContext";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import OnlineUsers from "./OnlineUsers";
import { getMsgs, registerMsg } from "../localStorage/utils";

const ChatBody = () => {
  const {  setChat, socket,  chat, currentUser, setCurrentUser } =
    useContext(ChatContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [on, setOn] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const resetCurrentUser = () => {
      const checkLS = JSON.parse(localStorage.getItem('userName'))
      if (checkLS) {
        setCurrentUser(checkLS)
      }
    }
    if (currentPath) {
      const room = currentPath.split("/")[currentPath.split("/").length - 1];
      const backupMsgs = getMsgs();
      if (room in backupMsgs) {
        setChat(backupMsgs[room]);
      } else {
        backupMsgs[room] = [];
        setChat(backupMsgs[room]);
      }
    }
    resetCurrentUser()
  }, [currentPath]);

  useEffect(() => {
    const room = currentPath.split("/")[currentPath.split("/").length - 1];
    setCurrentRoom(room);
    if (socket) {
      if (!on) {
        setOn(true);
        socket.on("dataMessage", (data) => {
          const messages = getMsgs();
          if (messages[room]) {
            const updatedChat = messages[room];
            setChat([...updatedChat, `${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
          } else {
            messages[room] = [];
            setChat([`${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
          }
        });
        socket.on("receivedMessage", (data) => {
          const messages = getMsgs();
          if (messages[room]) {
            const updatedChat = messages[room];
            setChat([...updatedChat, `${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
          } else {
            messages[room] = [];
            setChat([`${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
          }
        });
      }
    }
  }, [on, socket, setChat]);

  return (
    <div className="chat">
      <OnlineUsers/>
      <div className="chat__main">
        <ChatHeader />
        {console.log(currentUser)}
        <p>histórico de mensagens: </p>
        {currentUser && chat.map((msg) => (
          msg.split(':')[0] === currentUser.username
          ?  <div className="sented__message">{msg}</div>
          :<div className="received__message">{msg}</div>
         
        ))}
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatBody;

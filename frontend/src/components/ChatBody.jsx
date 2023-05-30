import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ChatContext from "../context/chatContext";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import OnlineUsers from "./OnlineUsers";
import { getMsgs, registerMsg } from "../localStorage/utils";

const ChatBody = () => {
  const { avaibleRooms, setChat, roomID, socket, selectedUser, chat } =
    useContext(ChatContext);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState({});
  const [on, setOn] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (currentPath) {
      const room = currentPath.split("/")[currentPath.split("/").length - 1];
      const backupMsgs = getMsgs();
      // setMessages(backupMsgs)
      if (room in backupMsgs) {
        setChat(backupMsgs[room]);
      } else {
        backupMsgs[room] = [];
        console.log(backupMsgs);
        setChat(backupMsgs[room]);
      }
    }
    return () => {
      setChat([]);
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentPath]);

  useEffect(() => {
    const room = currentPath.split("/")[currentPath.split("/").length - 1];
    setCurrentRoom(room);
    if (socket) {
      if (!on) {
        setOn(true);
        socket.on("dataMessage", (data) => {
          const messages = getMsgs();
          console.log(messages);
          if (messages[room]) {
            const updatedChat = messages[room];
            console.log(updatedChat);
            setChat([...updatedChat, `${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
            console.log("111");
          } else {
            messages[room] = [];
            setChat([`${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
          }
        });
        socket.on("receivedMessage", (data) => {
          const messages = getMsgs();
          console.log(messages);
          if (messages[room]) {
            const updatedChat = messages[room];
            setChat([...updatedChat, `${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
            console.log("222");
          } else {
            messages[room] = [];
            setChat([`${data.from}: ${data.content}`]);
            registerMsg(`${data.from}: ${data.content}`, data.room);
          }
        });
      }
    }
    return () => {
      setChat([]);
      if (socket) {
        socket.disconnect();
      }
    };
  }, [on, socket, setChat]);

  return (
    <div className="chat">
      <OnlineUsers />
      <div className="chat__main">
        <ChatHeader />
        {/* {filteredChat.length > 0 && filteredChat.map((message) => <p>{message}</p>)} */}
        <div>corpo</div>
        {chat.map((msg) => (
          <div>{msg}</div>
        ))}
        <ChatFooter />
        {/* {console.log('mensagem recebida', receivedmMessages)} */}
        {/* {chat.length > 0 && chat.map((message) => <p className='received__message'>{`${selectedUser?.name}: ${message}`}</p>)} */}
        {/* {console.log('mensagem enviada => ', sentedMessages)} */}
        {/* {chat.length > 0 && chat.map((message) => <p className='sented__message'>{`you: ${message}`}</p>)} */}
      </div>
    </div>
  );
};

export default ChatBody;

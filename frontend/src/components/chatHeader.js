import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../context/chatContext";
const ChatHeader = () => {
  const { socket } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    socket.disconnect();
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <>
      <header className="chat__mainHeader">
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
    </>
  );
};

export default ChatHeader;

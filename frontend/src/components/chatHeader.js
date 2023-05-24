import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../context/chatContext";
const ChatHeader = () => {
  const { socket, roomID } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    socket.disconnect(roomID);
    navigate("/");
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
    </>
  );
};

export default ChatHeader;

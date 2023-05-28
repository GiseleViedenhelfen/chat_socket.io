import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import ChatContext from "../context/chatContext";
const ChatHeader = () => {
  const { selectedUser, socket } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    socket.disconnect();
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <>
      <header className="chat__mainHeader">
        {selectedUser === null ? <h2>socket.io chat</h2> : <h2>{`${selectedUser.name}`}</h2>}    
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          SAIR
        </button>
      </header>
    </>
  );
};

export default ChatHeader;

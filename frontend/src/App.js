import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Home";
import ChatProvider from "./context/chatProvider";
import ChatBody from "./components/ChatBody";

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/home/:id" element={<ChatBody />} />
        </Routes>
      </BrowserRouter>

    </ChatProvider>
  );
}

export default App;

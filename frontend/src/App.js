import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Homepage from "./pages/Home";
import ChatProvider from "./context/chatProvider";

function App() {
  return (
    <ChatProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/home" element={<Homepage />} />
      </Routes>
    </BrowserRouter>

    </ChatProvider>
  );
}

export default App;

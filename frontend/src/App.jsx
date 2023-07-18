import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatProvider } from "../Context/ChatProvider";
import HomePage from "./Pages/HomePage";
import Chats from "./Pages/Chats";

function App() {
  return (
    <div className="app">
      <Router>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </ChatProvider>
      </Router>
    </div>
  );
}

export default App;

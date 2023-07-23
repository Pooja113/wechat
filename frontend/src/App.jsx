import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Chats from "./Pages/Chats";
import { ChatProvider } from "./Context/ChatProvider";

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

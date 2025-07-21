import React from "react";
import Navbar from "../components/Navbar.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import Sidebar from "../components/Sidebar.jsx";
const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar with bottom border */}
      <div className="border-b border-gray-300">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white">
          <Sidebar />
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default Home;

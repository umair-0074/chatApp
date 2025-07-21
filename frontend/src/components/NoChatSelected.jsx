import React from "react";
import { MessageCircle } from "lucide-react";
const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
      <MessageCircle className="w-12 h-12 mb-4 text-primary" />
      <h2 className="text-xl font-semibold">Welcome to Chat App</h2>
      <p className="mt-2">Select a chat to start the conversation</p>
    </div>
  );
};

export default NoChatSelected;

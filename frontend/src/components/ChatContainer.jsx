import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { formatMessageTime } from "../lib/utils.js";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-white">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border border-base-300">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            {/* Message Bubble with inline time */}
            <div className="chat-bubble bg-base-200 text-base-content shadow-sm px-3 py-2 max-w-xs sm:max-w-sm rounded-lg">
              {message.image ? (
                <>
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-md mb-1 max-w-full"
                  />
                  <div className="text-[10px] text-gray-500 text-right">
                    {formatMessageTime(message.createdAt)}
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-end gap-2">
                  <p className="break-words">{message.text}</p>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input at the bottom */}
      <div className="border-t border-base-300 bg-white">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;

import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 border-b border-base-300 bg-white">
      <div className="flex items-center justify-between">
        {/* Left: Avatar + User Info */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullname}
              className="w-8 h-8 object-cover rounded-full"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>

          {/* User Info */}
          <div className="text-left">
            <h3 className="text-sm font-medium text-base-content">
              {selectedUser.fullname}
            </h3>
            <p className="text-xs text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

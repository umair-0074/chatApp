import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  console.log("setSelectedUser:", setSelectedUser);
  console.log("selectedUser:", selectedUser);
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-semibold hidden lg:block text-base-content">
            Contacts
          </span>
        </div>

        {/* Online toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm text-base-content">Show online only</span>
          </label>
          <span className="text-xs text-gray-400">
            ({onlineUsers.length - 1}online)
          </span>
        </div>
      </div>

      {/* Contact List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full px-4 py-2 flex items-center gap-3 transition-colors rounded-lg
    ${
      selectedUser?._id === user._id
        ? "bg-base-200 ring-1 ring-primary"
        : "hover:bg-base-200"
    }
  `}
          >
            {/* Avatar: 1/4 of space */}
            <div className="flex-[1] relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-full aspect-square object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
      rounded-full ring-2 ring-white"
                />
              )}
            </div>

            {/* Info: 3/4 of space */}
            <div className="flex-[3] text-left min-w-0">
              <div className="font-medium truncate text-base-content">
                {user.fullname}
              </div>
              <div className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Users */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* App Name */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-primary">Chat App</h1>
      </div>

      {/* Logout Button */}
      <div className="flex-none">
        <button onClick={logout} className="btn btn-outline btn-error gap-2">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

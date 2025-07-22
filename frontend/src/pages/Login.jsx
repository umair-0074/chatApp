import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-12"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content opacity-70 hover:opacity-100"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader className="size-5 animate-spin" />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium" href="#">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block bg-blue-100 p-6 flex items-center justify-center">
          {/* <img
            src="https://cdn.dribbble.com/users/1580985/screenshots/14976150/media/0f67440008996d9e5b3d17b1ea3b88ea.png?compress=1&resize=800x600"
            alt="Login illustration"
            className="w-full h-auto object-contain"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

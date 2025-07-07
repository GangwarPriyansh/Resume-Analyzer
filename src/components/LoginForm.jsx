import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        //storing data in local storage
        
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.message || "login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("server error.Try again later");
    }
  };

  return (
    <div className="min-h-screen bg-[#313946] flex justify-center items-center px-4">
      <div className="bg-[#1c2331] p-8 rounded-lg shadow-2xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
            />
          </div>

          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:underline"
            >
              Sign Up
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("https://resume-analyzer-theta-ten.vercel.app/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!");
        //for storing data in redux
        dispatch(
          setUser({
            user: {
              name: formData.name,
              email: formData.email,
            },
            token: data.token,
            isAuthenticated: true,
          })
        );
        navigate("/");
      } else {
        toast.error(data.message || "signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed,Please try again");
    }
  };

  return (
    <div className="min-h-screen bg-[#313946] flex justify-center items-center px-4">
      <div className="bg-[#1c2331] p-8 rounded-lg shadow-2xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
            />
          </div>

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

          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[50%] translate-y-[40%] text-gray-400 hover:text-gray-300 cursor-pointer"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#2b313c] border border-gray-600 text-white"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[50%] translate-y-[40%] text-gray-400 hover:text-gray-300 cursor-pointer"
            />
          </div>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline"
            >
              Login
            </button>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#0d1117] text-white">
      <h1 className="text-2xl font-bold">
        Resume<span className="text-blue-500">Buddy</span>
      </h1>
      <nav className="flex gap-6">
        <button onClick={() => navigate("/")} className="hover:text-blue-400">
          Home
        </button>
        <a href="#" className="hover:text-blue-400">
          About
        </a>
        <button
          onClick={() => navigate("/login")}
          className="hover:text-blue-400"
        >
          Login
        </button>
      </nav>
    </header>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-[#0d1117] text-white relative">
      <h1 className="text-xl sm:text-2xl font-bold">
        Resume<span className="text-blue-500">Buddy</span>
      </h1>

      {/* desktop view */}
      <nav className="hidden md:flex font-medium gap-6 items-center">
        <button onClick={() => navigate("/")} className="hover:text-blue-400">
          Home
        </button>
        <a href="#" className="hover:text-blue-400">
          About
        </a>

        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2"
            >
              <span className="font-medium text-blue-500">Hello</span>
              <span className="font-medium">{user?.name}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-4 h-4 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1c2331] rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#2b313c]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hover:text-blue-400"
          >
            Login
          </button>
        )}
      </nav>

      {/* mobile view */}
      <button 
        className="md:hidden text-xl"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {showMobileMenu && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-[#0d1117] flex flex-col items-center py-4 gap-4 z-20">
          <button 
            onClick={() => {
              navigate("/");
              setShowMobileMenu(false);
            }} 
            className="hover:text-blue-400"
          >
            Home
          </button>
          <a href="#" className="hover:text-blue-400">
            About
          </a>

          {isAuthenticated ? (
            <div className="flex flex-col items-center">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2"
              >
                <span className="font-medium text-blue-500">Hello</span>
                <span className="font-medium">{user?.name}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`w-4 h-4 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDropdown && (
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="mt-2 px-4 py-2 text-sm hover:text-red-400 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-400 font-medium"
            >
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
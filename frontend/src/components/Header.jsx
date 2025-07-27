import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../slice/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faSignOutAlt,
  faUserCog,
  faHome,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success("Logout successful!");
    navigate("/");
  };

  const handleChevronClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-[#0d1117] text-white relative">
      <h1 className="text-xl sm:text-2xl font-bold">
        Resume<span className="text-blue-500">Buddy</span>
      </h1>

      {/* Desktop View */}
      <nav className="hidden md:flex font-medium gap-6 items-center">
        <button
          onClick={() => navigate("/")}
          className="hover:text-blue-400 flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
          Home
        </button>
        <button
          onClick={() => navigate("/about")}
          className="hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4" />
          About
        </button>

        {isAuthenticated ? (
          <div className="relative flex-shrink-0 flex items-center">
            <span className="font-medium text-blue-500">Hello</span>
            <span className="font-medium ml-1">{user?.name}</span>
            <button
              onClick={handleChevronClick}
              className="ml-2 focus:outline-none"
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`w-4 h-4 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-48 bg-[#1c2331] rounded-md shadow-lg py-1 z-10 border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:text-red-400 font-medium flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hover:text-blue-400 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
            Login
          </button>
        )}
      </nav>

      {/* Mobile View */}
      <button
        className="md:hidden text-xl"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {showMobileMenu && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-[#0d1117] flex flex-col items-center py-4 gap-4 z-20 border-t border-gray-800">
          <button
            onClick={() => {
              navigate("/");
              setShowMobileMenu(false);
            }}
            className="hover:text-blue-400 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
            Home
          </button>

          <button
            onClick={() => {
              navigate("/about");
              setShowMobileMenu(false);
            }}
            className="hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4" />
            About
          </button>

          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-4 w-full px-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-blue-500">Hello</span>
                <span className="font-medium">{user?.name}</span>
                <button
                  onClick={handleChevronClick}
                  className="focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-4 h-4 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {showDropdown && (
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-center px-4 py-2 text-sm hover:text-red-400 font-medium flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-400 font-medium flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

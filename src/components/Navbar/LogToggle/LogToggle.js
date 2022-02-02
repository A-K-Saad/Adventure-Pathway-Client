import Ripple from "material-ripple-effects";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const LogToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isAvatarOvered, setIsAvatarOvered] = useState(false);
  const { user, primaryAvatar, logOut } = useAuth();
  const ripple = new Ripple();

  return (
    <>
      <div className="flex items-center space-x-5">
        {user?.email ? (
          <>
            <button
              to="/login"
              className="inline-block py-2 px-5 mx-2 rounded-full text-white transition-colors duration-150 bg-red-500 focus:shadow-outline hover:bg-red-600 border border-transparent my-3 md:m-auto"
              onClick={logOut}
              onMouseUp={(e) => ripple.create(e, "light")}
            >
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
            <button
              className={`rounded-full p-0 w-10 h-10 border border-gray-300 overflow-hidden flex items-center justify-center bg-white my-3 md:m-auto cursor-pointer ${
                isMenuOpen && "ring-2 ring-offset-2"
              }`}
              onMouseOver={() => setIsAvatarOvered(true)}
              onMouseLeave={() => setIsAvatarOvered(false)}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onBlur={() => !isMenuHovered && setIsMenuOpen(false)}
            >
              <img
                src={
                  user?.photoURL ||
                  primaryAvatar ||
                  "https://i.ibb.co/qgbdqZ3/male.png"
                }
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/qgbdqZ3/male.png";
                }}
                alt="Avatar"
                className="max-w-none h-full"
              />
            </button>
            {isMenuOpen && (
              <div
                className="absolute top-16 right-10 rounded-md bg-white border px-5 py-3 animate__animated animate__bounceIn"
                onMouseOver={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
                onBlur={() => !isAvatarOvered && setIsMenuOpen(false)}
                disabled
              >
                <NavLink to="/dashboard">
                  <i className="fab fa-dropbox mr-2"></i>Dashboard
                </NavLink>
              </div>
            )}
          </>
        ) : (
          <>
            <NavLink
              to="/signup"
              onMouseUp={(e) => ripple.create(e, "light")}
              className="inline-block py-2 px-7 text-indigo-400 transition-colors duration-150 border border-indigo-400 focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100 rounded-full"
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              onMouseUp={(e) => ripple.create(e, "light")}
              className="inline-block py-2 px-8 rounded-full text-white transition-colors duration-150 bg-indigo-400 focus:shadow-outline hover:bg-indigo-500 border border-transparent"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </>
  );
};

export default LogToggle;

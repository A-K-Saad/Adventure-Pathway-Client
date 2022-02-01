import Ripple from "material-ripple-effects";
import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const LogToggle = () => {
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
            <div className="rounded-full p-0 w-10 h-10 border border-gray-300 overflow-hidden flex items-center justify-center bg-white my-3 md:m-auto">
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
            </div>
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

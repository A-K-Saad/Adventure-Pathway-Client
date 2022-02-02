import Ripple from "material-ripple-effects";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LogToggle from "./LogToggle/LogToggle";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const ripple = new Ripple();

  return (
    <>
      <div className="flex flex-wrap place-items-center sticky top-0 z-50">
        <section className="mx-auto w-full bg-white shadow-sm">
          <nav className="flex justify-between text-gray-400 left-0 right-0 m-auto">
            <div className="px-2 md:px-5 xl:px-12 py-1 flex w-full items-center justify-between">
              <NavLink onMouseUp={(e) => ripple.create(e, "light")} to="/">
                <img
                  src="https://i.ibb.co/KDDT4VM/adventure-pathway.png"
                  alt="Adventure Pathway"
                  className="w-48"
                />
              </NavLink>
              <div
                className={`${
                  isMenuOpen
                    ? "absolute md:relative top-20 md:top-0 w-full md:w-auto left-0 bg-white py-4 md:py-0 z-50 -mt-2 shadow-inner md:shadow-none border-b md:border-none"
                    : "hidden md:flex items-center justify-between"
                }`}
              >
                <div className="flex flex-wrap items-center px-4 justify-center mx-auto font-semibold font-heading text-gray-600">
                  <NavLink
                    onMouseUp={(e) => ripple.create(e, "light")}
                    to="/"
                    className="px-4 py-1 md:py-3"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onMouseUp={(e) => ripple.create(e, "light")}
                    to="/blogs"
                    className="px-4 py-1 md:py-3"
                  >
                    Blogs
                  </NavLink>
                  {user?.email && (
                    <NavLink
                      onMouseUp={(e) => ripple.create(e, "light")}
                      to="/feed"
                      className="px-4 py-1 md:py-3"
                    >
                      Feed
                    </NavLink>
                  )}
                  <NavLink
                    onMouseUp={(e) => ripple.create(e, "light")}
                    to="/reviews"
                    className="px-4 py-1 md:py-3"
                  >
                    Reviews
                  </NavLink>
                  <div className="inline-block md:hidden">
                    <LogToggle></LogToggle>
                  </div>
                </div>
              </div>
              <div className="hidden md:inline-block">
                <LogToggle></LogToggle>
              </div>
              {/* Small Device */}
              <div className="flex md:hidden items-center hambargar-menu">
                <button
                  className={`px-4 py-2 bg-gray-100 rounded-md border-gray-200 flex border ${
                    isMenuOpen && "opened-shadow"
                  }`}
                  onMouseUp={(e) => ripple.create(e, "light")}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  <i className="fas fa-bars text-2xl m-0 pointer-events-none"></i>
                </button>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Navbar;

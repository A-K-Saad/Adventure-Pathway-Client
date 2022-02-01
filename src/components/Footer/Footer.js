import Ripple from "material-ripple-effects";
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const ripple = new Ripple();
  return (
    <>
      <footer className="px-4 divide-y bg-white text-gray-500">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <NavLink
              to="/"
              onMouseUp={(e) => ripple.create(e, "light")}
              className="flex justify-center space-x-3 lg:justify-start"
            >
              <div className="flex items-center justify-center w-40 h-12 rounded-full">
                <img
                  src="https://i.ibb.co/KDDT4VM/adventure-pathway.pngs"
                  alt="Adventure Pathway"
                />
              </div>
            </NavLink>
          </div>
          <div className="lg:w-1/3 flex flex-col space-y-3 space-x-0 text-center font-bold">
            <h5 className="text-xl">Quick Links:</h5>
            <NavLink to="/" onMouseUp={(e) => ripple.create(e, "light")}>
              Home
            </NavLink>
            <NavLink
              onMouseUp={(e) => ripple.create(e, "light")}
              to="/products"
            >
              Products
            </NavLink>
            <NavLink
              onMouseUp={(e) => ripple.create(e, "light")}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink onMouseUp={(e) => ripple.create(e, "light")} to="/reviews">
              Reviews
            </NavLink>
          </div>
          <div className="lg:w-1/3 text-center text-3xl">
            <h5 className="font-bold text-lg">Social Media:</h5>
            <div className="flex space-x-5 py-3 justify-center">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-github"></i>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center text-coolGray-600">
          &copy; 1968 Company Co. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;

import Ripple from "material-ripple-effects";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const ripple = new Ripple();

  return (
    <>
      <div className="unfound-div flex align-center justify-center flex-col py-14 bg-gray-50">
        <div className="text-center pt-3">
          <i
            className="fab fa-java text-gray-400"
            style={{ fontSize: "200px" }}
          ></i>
          <h1 className="text-8xl font-black text-gray-500">404</h1>
          <h2 className="text-4xl">OOPS! Page not found!</h2>
          <h6 className="text-gray-400 mt-2">
            Seems like there's nothing to show here!
          </h6>
          <br />
          <Link
            to="/"
            onMouseUp={(e) => ripple.create(e, "light")}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;

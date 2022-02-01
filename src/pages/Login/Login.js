import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Alert from "../../hooks/Alert";
import Ripple from "material-ripple-effects";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const { signInWithGoogle, setUser, setLoading, emailSignin, saveUser } =
    useAuth();
  const history = useHistory();
  const location = useLocation();
  const { fireToast } = Alert();
  const ripple = new Ripple();

  const submitLogin = (e) => {
    e.preventDefault();
    emailSignin(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // sweetAlert("success", "Success", "Logged In SuccessFully!", false);

        fireToast("success", "Logged In Successfully!");
        setUser(user);
        history.push(location?.state?.from || "/");
      })
      .catch(() => {
        fireToast("error", "Invalid Email Or Password!");
        // const errorMessage = error.message;
        // sweetAlert("error", "OOPS!", `${errorMessage}!`, false);
      });
  };
  const googleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        saveUser(user.email, user.displayName, user.photoURL, "PUT");
        history.push(location?.state?.from || "/");
      })
      .catch(() => {
        // const errorMessage = error.message;
        fireToast("error", "Something Went Wrong!");

        // sweetAlert("error", "OOPS!", `${errorMessage}!`, false);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className="py-10">
        <form
          onSubmit={submitLogin}
          className="m-auto bg-white p-7 sign-form shadow-sm"
        >
          <h1 className="text-3xl text-center mb-5">Sign In to Your Account</h1>
          <label
            className="block text-sm font-bold mb-2 text-left"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="severus@snape.com"
            autoComplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="block text-sm font-bold mb-2 text-left mt-4"
            htmlFor="password"
          >
            Password
          </label>
          <div className="password-sector relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={isPassVisible ? "text" : "password"}
              placeholder="******"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fas cursor-pointer absolute top-0 bottom-0 m-auto right-0 items-center d-flex text-gray-700 mr-4 ${
                isPassVisible ? "fa-eye" : "fa-eye-slash"
              }`}
              onClick={() => setIsPassVisible(!isPassVisible)}
            ></i>
          </div>
          <p className="my-4 text-center">
            Don't Have Account?
            <NavLink
              onMouseUp={(e) => ripple.create(e, "light")}
              to="/signup"
              className="text-blue-700 italic"
            >
              {" "}
              Create Account
            </NavLink>
          </p>
          <button
            onMouseUp={(e) => ripple.create(e, "light")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign In
          </button>
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-300">Or</span>
            </div>
          </div>
          <button
            onMouseUp={(e) => ripple.create(e, "light")}
            type="button"
            className="bg-gray-50 border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded shadow w-full"
            onClick={googleSignIn}
          >
            <i className="fab fa-google mr-3"></i>
            Sign in with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;

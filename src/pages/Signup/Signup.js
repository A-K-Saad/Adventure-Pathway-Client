import { getAuth, updateProfile } from "@firebase/auth";
import Ripple from "material-ripple-effects";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import Alert from "../../hooks/Alert";
import useAuth from "../../hooks/useAuth";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [chosenFile, setChosenFile] = useState();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    signup,
    setUser,
    signInWithGoogle,
    setLoading,
    saveUser,
    verifyAccount,
  } = useAuth();
  const { fireToast } = Alert();
  const history = useHistory();
  const location = useLocation();
  const ripple = new Ripple();

  const createUserHandler = async (e) => {
    const auth = getAuth();
    e.preventDefault();
    //Hosting the image
    const imageData = new FormData();
    imageData.set("key", "47b2d957da970efd46650889d3040352");
    imageData.append("image", chosenFile);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    });
    const data = await response.json();

    const signUpWithEmail = () => {
      //Sign Up
      const image = data?.data?.url || "https://i.ibb.co/qgbdqZ3/male.png";
      signup(name, email, password, image)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
          }).then(() => {
            const user = userCredential.user;
            verifyAccount();
            setUser(user);
            saveUser(user.email, user.displayName, user.photoURL, "POST");
          });
          // sweetAlert("success", "Success", "Signed Up Successfully!", false);
          fireToast("success", "SignedUp Successfully!");
          history.push("/dashboard");
        })
        .catch(() => {
          // const errorMessage = error.message;
          // sweetAlert("error", "OOPS!", errorMessage, false);
          fireToast("error", "Soemthing went wrong!");
        });
    };
    if (chosenFile) {
      if (data?.data.url) {
        signUpWithEmail();
      }
    } else {
      signUpWithEmail();
    }
    e.target.reset();
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
          onSubmit={createUserHandler}
          className="m-auto bg-white p-7 sign-form shadow-sm"
        >
          <h1 className="text-3xl text-center mb-5">Create An Account</h1>
          <label
            className="block text-sm font-bold mb-2 text-left"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Severus Snape"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label
            className="block text-sm font-bold mb-2 text-lefte mt-4"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="severus@snape.com"
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
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-8">
            <i className="fas fa-cloud-upload-alt mr-2"></i>
            <input
              type="file"
              className="custom-file-input"
              onChange={(e) => {
                setChosenFile(e.target.files[0]);
                e.target.click();
              }}
            />
          </div>
          <p className="my-4 text-center">
            Already Have Account?
            <NavLink
              onMouseUp={(e) => ripple.create(e, "light")}
              to="/login"
              className="text-blue-700 italic"
            >
              {" "}
              Login
            </NavLink>
          </p>
          <button
            onMouseUp={(e) => ripple.create(e, "light")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign Up
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
            type="button"
            onMouseUp={(e) => ripple.create(e, "light")}
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

export default Signup;

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";
import Alert from "./Alert";

initializeAuthentication();

const UseFirebase = () => {
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [primaryAvatar, setPrimaryAvatar] = useState("");
  const [primaryName, setPrimaryName] = useState("");
  const { sweetAlert } = Alert();

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, [auth]);

  useEffect(() => {
    setIsCheckingAdmin(true);
    fetch(`https://adventure-pathway.herokuapp.com/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.admin);
        setIsCheckingAdmin(false);
      });
  }, [user.email]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        sweetAlert("success", "Success", "Logged Out SuccessFully", false);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        sweetAlert("error", "OOPS!", `${errorMessage}!`, false);
        console.log(`OOPS! ${errorMessage}`);
      });
  };
  const emailSignin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   sweetAlert("success", "Success", "Logged In SuccessFully", false);
    //   setUser(user);
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   sweetAlert("error", "OOPS!", `Error ${errorCode}! ${errorMessage}`);
    // });
  };
  const signup = async (name, email, password, avatar) => {
    setPrimaryAvatar(avatar);
    setPrimaryName(name);
    return createUserWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //   updateProfile(auth.currentUser, {
    //     displayName: name,
    //     photoURL: avatar || "https://i.ibb.co/qgbdqZ3/male.png",
    //   }).then(() => {
    //     setUser(userCredential.user);
    //   });
    //   sweetAlert("success", "Success", "Signed Up Successfully!", false);
    // })
    // .catch((error) => {
    //   const errorMessage = error.message;
    //   sweetAlert("error", "OOPS!", errorMessage, false);
    // });
  };
  const verifyAccount = () => {
    sendEmailVerification(auth?.currentUser)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  const saveUser = (email, displayName, avatar, method) => {
    const user = {
      email: email,
      displayName: displayName,
      avatar: avatar,
    };
    fetch("https://adventure-pathway.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  return {
    user,
    isAdmin,
    loading,
    isCheckingAdmin,
    setLoading,
    primaryAvatar,
    primaryName,
    signInWithGoogle,
    logOut,
    signup,
    emailSignin,
    setUser,
    verifyAccount,
    saveUser,
  };
};

export default UseFirebase;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Alert from "../../../hooks/Alert";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [adminEmail, setAdminEmail] = useState("");
  const { user } = useAuth();
  const userEmail = user?.email;
  const { sweetAlert } = Alert();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://adventure-pathway.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, [adminEmail]);

  const UserAvatar = ({ user }) => {
    return (
      <NavLink to={`/user/${user._id}`} className="w-12 relative">
        <div className="rounded-full w-10 h-10 border border-gray-300 overflow-hidden">
          <img
            src={user.avatar}
            onError={(e) =>
              (e.target.src = "https://i.ibb.co/qgbdqZ3/male.png")
            }
            alt={user.name}
            className="max-w-none h-full"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 bottom-0 left-7 ${
            user.role === "admin" ? "absolute" : "hidden"
          }`}
          fill="lightgreen"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      </NavLink>
    );
  };

  const SingleUser = ({ user }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const handleAdminSubmit = (requestFor, role) => {
      setIsUpdating(true);
      fetch("https://adventure-pathway.herokuapp.com/admin", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          requester: userEmail,
          request: requestFor,
          role: role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            setAdminEmail(requestFor);
            setIsUpdating(false);
          }
        })
        .catch((error) => sweetAlert("error", "OOPS!", error.message, false));
    };
    return (
      <div className="bg-white shadow-md rounded p-2">
        <div className="flex justify-between items-center">
          <UserAvatar user={user}></UserAvatar>
          {user.role === "admin" ? (
            <i
              className="fas fa-user-times text-red-500 cursor-pointer"
              onClick={() => handleAdminSubmit(user.email, "user")}
              title="Demote User"
            ></i>
          ) : isUpdating ? (
            <i className="fas fa-spinner text-gray-800"></i>
          ) : (
            <i
              className="fas fa-user-shield text-green-400 cursor-pointer"
              onClick={() => handleAdminSubmit(user.email, "admin")}
              title="Make Admin"
            ></i>
          )}
        </div>
        <NavLink to={`/user/${user._id}`} className="mt-3">
          <h4 className="text-md">{user.displayName}</h4>
          <p className="text-sm text-gray-400 truncate">{user.email}</p>
        </NavLink>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="text-center w-full h-full flex items-center justify-center">
        <img
          src="https://i.ibb.co/VtWDJq1/loading.gif"
          alt="Loader"
          className="w-100"
        />
      </div>
    );
  }

  if (users.length < 2 && !isLoading) {
    return (
      <div className="text-center w-full h-full flex items-center justify-center text-2xl font-bold">
        No Users Yet!
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center w-full px-5">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-gray-50 py-4">
              All Users
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
          {users
            .filter((i) => i.email !== user.email)
            ?.map((user) => (
              <div key={user._id}>
                <SingleUser user={user}></SingleUser>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://adventure-pathway.herokuapp.com/allBlogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <div className="md:py-9">
          <div className="flex items-center justify-center px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-gray-500">
              <NavLink
                to="/dashboard/manage-blogs/Approved"
                className="p-5 rounded shadow-md bg-white"
              >
                <div className="flex items-start justify-between">
                  <i className="fas fa-clipboard-check text-7xl"></i>
                  <i className="fas fa-expand-alt"></i>
                </div>
                <h1 className="text-xl font-bold text-black">
                  {blogs.filter((b) => b.status === "Approved").length} Approved
                </h1>
                How many blogs are approved?
              </NavLink>
              <NavLink
                to="/dashboard/manage-blogs/Pending"
                className="p-5 rounded shadow-md bg-white"
              >
                <div className="flex items-start justify-between">
                  <i className="fas fa-tasks text-7xl"></i>
                  <i className="fas fa-expand-alt"></i>
                </div>
                <h1 className="text-xl font-bold text-black">
                  {blogs.filter((b) => b.status === "Pending").length} Pending
                </h1>
                How many blogs are Pending?
              </NavLink>
              <NavLink
                to="/dashboard/manage-blogs/Rejected"
                className="p-5 rounded shadow-md bg-white"
              >
                <div className="flex items-start justify-between">
                  <i className="fas fa-ban text-7xl"></i>
                  <i className="fas fa-expand-alt"></i>
                </div>
                <h1 className="text-xl font-bold text-black">
                  {blogs.filter((b) => b.status === "Rejected").length} Rejected
                </h1>
                How many blogs are rejected?
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBlogs;

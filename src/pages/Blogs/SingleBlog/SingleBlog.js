import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SingleBlog = ({ blog, isProfile }) => {
  const [blogWriter, setBlogWriter] = useState({});

  useEffect(() => {
    fetch(`https://adventure-pathway.herokuapp.com/specificUser/${blog.email}`)
      .then((res) => res.json())
      .then((data) => setBlogWriter(data))
      .catch((err) => console.log(err));
  }, [blog.email]);
  return (
    <>
      <div className="p-5">
        {!isProfile && (
          <div className="flex justify-between items-start mb-4">
            <NavLink
              to={`/user/${blogWriter._id}`}
              className="flex items-center space-x-2"
            >
              <div className="rounded-full p-0 w-10 h-10 border border-gray-300 overflow-hidden flex items-center justify-center bg-white">
                <img
                  src={
                    blogWriter?.avatar || "https://i.ibb.co/qgbdqZ3/male.png"
                  }
                  onError={(e) => {
                    e.target.src = "https://i.ibb.co/qgbdqZ3/male.png";
                  }}
                  alt="Avatar"
                  className="max-w-none h-full"
                />
              </div>
              <div>
                <h1>{blog.name}</h1>
              </div>
            </NavLink>
            <NavLink to={`/blogs/${blog._id}`}>
              <i className="fas fa-expand-alt text-gray-800"></i>
            </NavLink>
          </div>
        )}
        <NavLink to={`/blogs/${blog._id}`}>
          <div className="flex flex-col md:flex-row md:space-x-4 items-center">
            <img
              src={blog.photo}
              alt="IMAGE_NOT_FOUND"
              className="w-full md:w-56 mb-2 md:mb-0 rounded"
            />
            <div>
              <h1 className="font-bold">{blog.title}</h1>
              <p className="text-justify">{blog.description.slice(0, 180)}..</p>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};
export default SingleBlog;

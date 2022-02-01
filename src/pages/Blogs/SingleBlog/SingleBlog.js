import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SingleBlog = ({ blog }) => {
  const [blogWriter, setBlogWriter] = useState({});

  useEffect(() => {
    fetch(`https://adventure-pathway.herokuapp.com/specificUser/${blog.email}`)
      .then((res) => res.json())
      .then((data) => setBlogWriter(data))
      .catch((err) => console.log(err));
  }, [blog.email]);
  return (
    <>
      <NavLink to={`/blogs/${blog._id}`}>
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
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
            </div>
            <i className="fas fa-expand-alt text-gray-800"></i>
          </div>
          <div className="flex space-x-4 items-center pt-4">
            <img
              src={blog.photo}
              alt="IMAGE_NOT_FOUND"
              className="w-56 rounded"
            />
            <div>
              <h1 className="font-bold">{blog.title}</h1>
              <p className="text-justify">{blog.description.slice(0, 180)}..</p>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};
export default SingleBlog;

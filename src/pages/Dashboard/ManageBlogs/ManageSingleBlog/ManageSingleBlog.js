import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "../../../../hooks/Alert";

const ManageSingleBlog = ({ blog, setUpdateNumber }) => {
  const [blogWriter, setBlogWriter] = useState({});
  const { fireToast } = Alert();
  useEffect(() => {
    fetch(`https://adventure-pathway.herokuapp.com/specificUser/${blog.email}`)
      .then((res) => res.json())
      .then((data) => setBlogWriter(data))
      .catch((err) => console.log(err));
  }, [blog.email]);

  const updateStatus = (status) => {
    fetch(`https://adventure-pathway.herokuapp.com/blogs/${blog._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
        name: blog.name,
        price: blog.price,
        email: blog.email,
        date: blog.date,
        location: blog.location,
        description: blog.description,
        photo: blog.photo,
        title: blog.title,
      }),
    })
      .then((res) => res.json())
      .then(() => setUpdateNumber(Math.random()));
  };

  const deleteBlog = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://adventure-pathway.herokuapp.com/blogs/${blogId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(() => {
            setUpdateNumber(Math.random());
            fireToast("success", "Deleted Successfully");
          });
      }
    });
  };

  return (
    <>
      <div
        className={`${
          blog.status === "Rejected" && "border border-red-400"
        } bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="rounded-full p-0 w-10 h-10 border border-gray-300 overflow-hidden flex items-center justify-center bg-white">
              <img
                src={blogWriter?.avatar || "https://i.ibb.co/qgbdqZ3/male.png"}
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/qgbdqZ3/male.png";
                }}
                alt="Avatar"
                className="max-w-none h-full"
              />
            </div>
            <div>
              <h1>{blog.name}</h1>
              <h1 className="text-gray-500">{blog.email}</h1>
            </div>
          </div>
          <div>
            {blog.status === "Approved" ? (
              <i
                className="fas fa-ban text-red-500 cursor-pointer mr-3 text-xl"
                onClick={() => updateStatus("Rejected")}
              ></i>
            ) : blog.status === "Rejected" ? (
              <i
                className="fas fa-clipboard-check text-green-500 cursor-pointer mr-3 text-xl"
                onClick={() => updateStatus("Approved")}
              ></i>
            ) : (
              <>
                <i
                  className="fas fa-clipboard-check text-green-500 cursor-pointer mr-3 text-xl"
                  onClick={() => updateStatus("Approved")}
                ></i>

                <i
                  className="fas fa-ban text-red-500 cursor-pointer mr-3 text-xl"
                  onClick={() => updateStatus("Rejected")}
                ></i>
              </>
            )}
            <i
              className="fas fa-trash text-red-300 mr-3 text-xl cursor-pointer"
              onClick={() => deleteBlog(blog._id)}
            ></i>
            <NavLink to={`/blogs/${blog._id}`}>
              <i className="fas fa-expand-alt text-gray-800"></i>
            </NavLink>
          </div>
        </div>
        <h1>{blog.description.slice(0, 200)}...</h1>
      </div>
    </>
  );
};

export default ManageSingleBlog;

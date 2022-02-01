import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Ripple from "material-ripple-effects";
import useAuth from "../../hooks/useAuth";
import "animate.css";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [blogWriter, setBlogWriter] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const ripple = new Ripple();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateNumber, setUpdateNumber] = useState(0);
  const history = useHistory();

  useEffect(() => {
    // setIsLoading(true);
    fetch(`https://adventure-pathway.herokuapp.com/blogs/${blogId}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);

        fetch(
          `https://adventure-pathway.herokuapp.com/specificUser/${data.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            setBlogWriter(data);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [blogId, updateNumber]);

  const reactToBlog = (isLike) => {
    const updateLikes = (likes) => {
      setIsUpdating(true);
      fetch(`https://adventure-pathway.herokuapp.com/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: likes,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setIsUpdating(false);
          setUpdateNumber(Math.random() * 47);
        })
        .catch((err) => console.log(err));
    };

    let likes;
    if (isLike) {
      likes = [...blog?.likes, user?.email];
      updateLikes(likes);
    } else {
      likes = blog?.likes?.filter((email) => email !== user?.email);
      updateLikes(likes);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-5">
        <img
          src="https://i.ibb.co/QjZhgZc/load.gif"
          alt="Loading..."
          className="w-20"
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-full md:w-3/5 mx-auto p-5">
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
          </div>
        </div>
        <div className="p-5 text-gray-500">
          <h1 className="text-center text-xl mb-3 font-bold">{blog.title}</h1>
          <div className="mb-4 font-bold">
            <span>
              <i className="fas fa-map-marker-alt mr-2"></i>
              {blog.location}
            </span>
            <span>
              <i className="far fa-calendar-alt mr-2 ml-4"></i>
              {blog.date}
            </span>
            <h1 className="text-xl">
              <i className="fas fa-dollar-sign mr-1"></i>
              {blog.price}
            </h1>
          </div>
          <div className="text-center w-full">
            <img
              src={blog.photo}
              alt="IMAGE_NOT_FOUND"
              className="max-w-full rounded-lg mb-3 border m-auto"
            />
          </div>
          <p className="whitespace-pre-line text-justify">{blog.description}</p>
          <div className="p-5">
            <div
              className="flex items-center space-x-2"
              onClick={() => !user?.email && history.push("/login")}
            >
              {blog?.likes?.indexOf(user?.email) === -1 ? (
                <button
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl"
                  onMouseUp={(e) => ripple.create(e, "dark")}
                  onClick={() => reactToBlog(true)}
                >
                  <i className="far fa-heart"></i>
                </button>
              ) : isUpdating ? (
                <button
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl"
                  onMouseUp={(e) => ripple.create(e, "dark")}
                >
                  <i className="fas fa-spinner"></i>
                </button>
              ) : (
                <button
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl text-red-500"
                  onMouseUp={(e) => ripple.create(e, "dark")}
                  onClick={() => reactToBlog(false)}
                >
                  <i className="fas fa-heart drop-shadow-lg animate__animated animate__heartBeat"></i>
                </button>
              )}
              <h1 className="text-gray-500">{blog?.likes?.length}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;

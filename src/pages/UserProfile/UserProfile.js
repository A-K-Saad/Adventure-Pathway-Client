import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleBlog from "../Blogs/SingleBlog/SingleBlog";

const UserProfile = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://adventure-pathway.herokuapp.com/specificUserId/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        fetch(
          `https://adventure-pathway.herokuapp.com/users/blogs/${data.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            setBlogs(data);
            setIsLoading(false);
            window.scrollTo(0, 0);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [userId]);

  if (isLoading) {
    return (
      <div className="col-span-12 md:col-span-8 flex justify-center items-center py-5">
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
      <div className="max-w-2xl m-auto w-full">
        <div className="h-32 w-full object-cover lg:h-48 bg-gradient-to-r from-indigo-500 to-green-200 via-blue-300 rounded-b-lg"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 md:-mt-16 md:flex md:items-center flex-col justify-center">
            <div className="rounded-full ring-4 ring-white h-32 w-32 m-auto bg-gray-50 flex overflow-hidden justify-center items-center">
              <img
                className="max-w-none h-full w-auto"
                src={currentUser?.avatar || "https://i.ibb.co/qgbdqZ3/male.png"}
                alt="Avatar"
              />
            </div>
            <div className="mx-4">
              <div className="sm:hidden md:block flex-1 text-center">
                <h1 className="text-2xl font-bold text-gray-900 truncate mt-3">
                  {currentUser?.displayName}
                </h1>
              </div>
            </div>
          </div>
          <div className="hidden mt-6 sm:block md:hidden min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {currentUser?.displayName}
            </h1>
          </div>
        </div>
        <div className="p-5">
          <div className="relative w-full mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-start">
              <span className="pr-3 font-medium text-neutral-600 bg-gray-50">
                From{" "}
                <span className="italic font-bold text-blue-800">
                  {currentUser?.displayName}
                </span>
              </span>
            </div>
          </div>
          {blogs?.map((blog) => {
            return (
              <div key={blog._id} className="mb-2 shadow-sm bg-white rounded">
                <SingleBlog blog={blog} isProfile={true}></SingleBlog>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserProfile;

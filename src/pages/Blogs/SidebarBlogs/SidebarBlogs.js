import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://adventure-pathway.herokuapp.com/topBlogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div className="col-span-12 md:col-span-8 flex justify-center items-center py-5">
        <img
          src="https://i.ibb.co/QjZhgZc/load.gif"
          alt="Loading..."
          className="w-16"
        />
      </div>
    );
  }

  return (
    <>
      <div className="p-5">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-gray-50 py-4">
              Top Blogs
            </span>
          </div>
        </div>
        {blogs
          ?.filter((b) => b.status === "Approved")
          .map((blog) => {
            return (
              <div key={blog._id}>
                <NavLink to={`/blogs/${blog._id}`}>
                  <div className="flex items-center space-x-3 py-3">
                    <img
                      src={blog.photo}
                      alt={blog.title.slice(0, 5)}
                      className="w-24 rounded-md border"
                    />
                    <div>
                      <h1 className="text-sm">{blog.title}</h1>
                      <p className="text-xs text-gray-500 italic">
                        <span className="text-black not-italic">by </span>
                        {blog.name}
                      </p>
                    </div>
                  </div>
                  <hr />
                </NavLink>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SidebarBlogs;

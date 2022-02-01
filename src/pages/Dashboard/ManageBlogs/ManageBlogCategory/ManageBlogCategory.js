import Ripple from "material-ripple-effects";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ManageSingleBlog from "../ManageSingleBlog/ManageSingleBlog";

const ManageBlogCategory = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [updateNumber, setUpdateNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const ripple = new Ripple();

  useEffect(() => {
    fetch(`https://adventure-pathway.herokuapp.com/allBlogs/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category, updateNumber]);

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
      <div className="w-full h-full px-5">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-gray-50 py-4">
              {category} Blogs
            </span>
          </div>
        </div>
        <button
          className="mb-3 bg-green-400 hover:bg-green-500 transition-all py-2 px-6 rounded text-white"
          type="submit"
          onMouseUp={(e) => ripple.create(e, "light")}
          onClick={() =>
            history.goBack() || history.push("/dahsboard/manage-blogs")
          }
        >
          <i className="fas fa-long-arrow-alt-left mr-2"></i>Back
        </button>
        <div className="grid grid-cols-1 grid-cols-2 gap-4">
          {blogs?.map((blog) => {
            return (
              <ManageSingleBlog
                key={blog._id}
                blog={blog}
                setUpdateNumber={setUpdateNumber}
              ></ManageSingleBlog>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ManageBlogCategory;

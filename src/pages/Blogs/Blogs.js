import React, { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog/SingleBlog";

const Blogs = ({ isTwoColumn }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://adventure-pathway.herokuapp.com/blogs?currentPage=0")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs);
        setCount(data.count);
        setIsLoading(false);
      });
  }, [currentPage]);
  const pageNumbers = [...Array(Math.ceil(count / 10)).keys()];

  const Pagination = () => {
    return (
      <div className="flex space-x-4 justify-center items-center">
        <button
          className="bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-all p-2 w-12 h-12"
          onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        {pageNumbers.map((k) => {
          return (
            <button
              key={k}
              className={`${
                currentPage === k
                  ? "bg-green-600"
                  : "bg-green-400 hover:bg-green-500"
              } rounded-full flex items-center justify-center text-white transition-all p-2 w-12 h-12`}
              onClick={() => setCurrentPage(k)}
            >
              {k}
            </button>
          );
        })}
        <button
          className="bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-all p-2 w-12 h-12"
          onClick={() =>
            currentPage !== pageNumbers[pageNumbers.length - 1] &&
            setCurrentPage(currentPage + 1)
          }
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    );
  };
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
      <div className="col-span-12 md:col-span-8 p-5">
        <div
          className={`${
            isTwoColumn && "grid grid-cols-1 md:grid-cols-2 gap-4"
          }`}
        >
          {blogs.map((blog) => {
            return (
              <div key={blog._id} className="mb-2 shadow-sm bg-white">
                <SingleBlog blog={blog}></SingleBlog>
              </div>
            );
          })}
        </div>
        <Pagination></Pagination>
      </div>
    </>
  );
};

export default Blogs;

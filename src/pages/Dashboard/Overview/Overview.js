import React, { useEffect, useState } from "react";

const Overview = () => {
  const [overviews, setOverviews] = useState({});
  useEffect(() => {
    fetch("https://adventure-pathway.herokuapp.com/overview")
      .then((res) => res.json())
      .then((data) => setOverviews(data));
  }, []);
  return (
    <>
      <div className="h-full w-full">
        <div className="md:py-9">
          <div className="flex items-center justify-center px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-gray-500">
              <div className="p-5 rounded shadow-md bg-white">
                <i className="fas fa-users text-7xl block"></i>
                <h1 className="text-xl font-bold text-black">
                  {overviews.users} Users
                </h1>
                How many users are there?
              </div>
              <div className="p-5 rounded shadow-md bg-white">
                <i className="fab fa-blogger text-7xl block"></i>
                <h1 className="text-xl font-bold text-black">
                  {overviews.blogs} Blogs
                </h1>
                How many blogs are posted?
              </div>
              <div className="p-5 rounded shadow-md bg-white">
                <i className="fas fa-comments text-7xl block"></i>
                <h1 className="text-xl font-bold text-black">
                  {overviews.reviews} Reviews
                </h1>
                How many users have reviewed?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;

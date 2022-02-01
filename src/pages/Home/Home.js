import React from "react";
import Banner from "../../components/Banner/Banner";
import Blogs from "../Blogs/Blogs";
import SidebarBlogs from "../Blogs/SidebarBlogs/SidebarBlogs";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="grid grid-cols-12">
        <Blogs></Blogs>
        <div className="col-span-12 md:col-span-4">
          <SidebarBlogs></SidebarBlogs>
        </div>
      </div>
      <Reviews sliceQuantity={2}></Reviews>
    </>
  );
};

export default Home;

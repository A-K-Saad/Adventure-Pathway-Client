import React from "react";
import image1 from "../../images/banner-1.png";
import image2 from "../../images/banner-2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination } from "swiper";
import { NavLink } from "react-router-dom";

SwiperCore.use([Pagination]);

const Banner = () => {
  return (
    <>
      <div className="w-full">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide
            className="md:flex justify-between"
            style={{ height: "27rem" }}
          >
            <div className="flex flex-col items-center md:items-start justify-center md:pl-15 lg:pl-32 p-10 text-center md:text-left">
              <h1 className="text-xl md:text-4xl">Explore Out The World</h1>
              <p>
                Explore what are there in the world and find the best places to
                go. Explore the amazing places and get ready for your next
                experience.
              </p>
              <NavLink
                to="/blogs"
                className="bg-green-400 hover:bg-green-500 transition-all rounded px-6 py-2 mt-3 text-white"
              >
                Explore
              </NavLink>
            </div>
            <img src={image1} alt="Image1" className="hidden md:block h-full" />
          </SwiperSlide>
          <SwiperSlide
            className="md:flex justify-between"
            style={{ height: "27rem" }}
          >
            <img src={image2} alt="Image1" className="hidden md:block h-full" />
            <div className="flex flex-col items-center md:items-end justify-center md:pr-15 lg:pr-32 p-10 text-center md:text-right">
              <h1 className="text-xl md:text-4xl">
                Explore Peoples' Experience
              </h1>
              <p>
                See how people get experience. Explore their experience and be
                ready for your next adventure!
              </p>
              <NavLink
                to="/blogs"
                className="bg-green-400 hover:bg-green-500 transition-all rounded px-6 py-2 mt-3 text-white"
              >
                Explore
              </NavLink>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Banner;

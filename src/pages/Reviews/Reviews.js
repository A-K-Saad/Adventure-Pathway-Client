import Ripple from "material-ripple-effects";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Reviews = ({ sliceQuantity }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ripple = new Ripple();

  useEffect(() => {
    fetch("https://adventure-pathway.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <img
          src="https://i.ibb.co/QjZhgZc/load.gif"
          alt="Loading..."
          className="w-24"
        />
      </div>
    );
  }

  return (
    <>
      {reviews?.length >= 1 && (
        <div className={`px-3 md:px-14 lg:px-32 my-7`}>
          <div className="flex mb-5 rounded-lg flex-col md:flex-row justify-between">
            <img
              src="https://i.ibb.co/fDkLmtv/message-2872335-2389549.webp"
              alt="Message"
              className="max-w-full"
            />
            <div className="text-center p-5 md:p-9 lg:p-15 text-white flex justify-center flex-col bg-gradient-to-br from-blue-200 to-purple-300 message-clip w-full pt-14 rounded-lg">
              <h1 className="text-6xl font-black filter drop-shadow">
                How We Serve
              </h1>
              <p className="filter drop-shadow py-2">
                Commited to serve you the right. We're always responsivable to
                you.
                <br /> Your feedback is very valueable to us. We always care
                about your satisfiction.
              </p>
              <div className="flex justify-center space-x-5">
                <NavLink
                  onMouseUp={(e) => ripple.create(e, "light")}
                  className="bg-white hover:bg-gray-50 text-indigo-400 hover:text-indigo-500 py-2 px-4 rounded transition-all"
                  to="/dashboard/add-review"
                >
                  Review Us
                </NavLink>
                <NavLink
                  onMouseUp={(e) => ripple.create(e, "light")}
                  className="bg-white hover:bg-gray-50 text-indigo-400 hover:text-indigo-500 py-2 px-4 rounded transition-all"
                  to="/reviews"
                >
                  See Reviews
                </NavLink>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews?.slice(0, sliceQuantity).map((review) => {
              const ratingElements = [];
              const unRatedElements = [];
              for (let i = 0; i < review.rating; i++) {
                ratingElements.push(
                  <i className="fas fa-star text-yellow-500"></i>
                );
              }
              for (let i = 0; i < 5 - review.rating; i++) {
                unRatedElements.push(
                  <i className="far fa-star text-gray-500"></i>
                );
              }
              return (
                <div
                  key={review._id}
                  className="items-center bg-white rounded shadow-sm px-5 py-4 text-gray-600 rounded"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="rounded-full w-16 h-16 border border-gray-300 overflow-hidden mr-3">
                      <img
                        src={review.avatar}
                        onError={(e) =>
                          (e.target.src = "https://i.ibb.co/qgbdqZ3/male.png")
                        }
                        alt={review.name}
                        className="max-w-none h-full bg-white"
                      />
                    </div>
                    <div className="text-left">
                      <p>{review.name}</p>
                      <p>
                        {review?.email.replace(
                          /(\w{3})[\w.-]+@([\w.]+\w)/,
                          "$1***@$2"
                        )}
                      </p>
                      <div className="flex space-x-">
                        {ratingElements.map((element, index) => (
                          <div key={index}>{element}</div>
                        ))}
                        {unRatedElements.map((element, index) => (
                          <div key={index}>{element}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="review-message text-gray-400">
                      <span className="text-indigo-500">“</span>
                      {review.message}
                      <span className="text-indigo-500">”</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;

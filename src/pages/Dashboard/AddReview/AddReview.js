import React, { useState } from "react";
import Alert from "../../../hooks/Alert";
import useAuth from "../../../hooks/useAuth";

const AddReview = () => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const { user } = useAuth();
  const { sweetAlert } = Alert();

  const handleReview = (e) => {
    e.preventDefault();
    const review = {
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL,
      message: message,
      rating: rating,
    };
    fetch("https://adventure-pathway.herokuapp.com/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        sweetAlert(
          "success",
          "Review Submitted",
          "Thank you for your review",
          false
        );
      })
      .catch((err) => sweetAlert("error", "OOPS!", err, false));
    e.target.reset();
  };
  return (
    <>
      <div className="w-full h-full">
        <div className="flex items-center justify-center h-full">
          <div className="md:p-9 w-full h-full flex items-center justify-center">
            <form
              onSubmit={handleReview}
              className="m-auto bg-white p-7 sign-form shadow-sm w-full"
            >
              <h1 className="text-3xl text-center">Add a review</h1>
              <label
                className="block text-sm font-bold mb-2 text-lefte mt-4"
                htmlFor="review"
              >
                Your Review
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="review"
                type="text"
                placeholder="Enter Your Review"
                required
                rows="4"
                onChange={(e) => setMessage(e.target.value)}
              />
              <label
                className="block text-sm font-bold mb-2 text-lefte mt-4"
                htmlFor="rating"
              >
                Rating
              </label>
              <input
                id="rating"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Enter Your Rating"
                type="number"
                min="1"
                max="5"
                onChange={(e) => {
                  if (e.target.value > 5) {
                    e.target.value = 5;
                  } else if (e.target.value < 1) {
                    e.target.value = 1;
                  }
                  setRating(e.target.value);
                }}
              />
              <button
                className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4 text-center"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReview;

import React, { useState } from "react";
import Ripple from "material-ripple-effects";
import Alert from "../../../hooks/Alert";
import UploadImage from "../../../hooks/UploadImage";
import useAuth from "../../../hooks/useAuth";

const AddBlog = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const { sweetAlert, fireToast } = Alert();
  const ripple = new Ripple();
  const { uploadImage } = UploadImage();
  const { user, isAdmin } = useAuth();

  const postBlog = async (e) => {
    setIsAdding(true);
    e.preventDefault();
    if (photo) {
      fetch("https://adventure-pathway.herokuapp.com/blogs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: parseFloat(price),
          date: date,
          title: title,
          location: location,
          description: description,
          photo: photo,
          email: user?.email,
          status: isAdmin ? "Approved" : "Pending",
          likes: [],
        }),
      })
        .then(() => {
          e.target.reset();
          setIsAdding(false);
          fireToast("success", "Added Blog Successfully!");
          setName("");
          setPrice(0);
          setTitle("");
          setLocation("");
          setDate("");
          setDescription("");

          setPhoto("");
        })
        .catch(() => {
          sweetAlert("error", "OOPS!", "Failed To Add Blog!");
        });
    }
  };

  return (
    <div className="p-2 md:px-8 md:py-4 min-w-full min-h-full">
      <div className="relative w-full mb-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-start">
          <span className="pr-3 text-lg font-medium text-neutral-600 bg-gray-50">
            Add a Blog
          </span>
        </div>
      </div>
      <form onSubmit={postBlog} className="max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="w-full">
            <label
              className="block text-sm font-bold mb-2 text-left"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Your Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-bold mb-2 text-left"
              htmlFor="price"
            >
              Cost
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Enter The Travel Cost"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <label
          className="block text-sm font-bold my-2 text-left"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Blog Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <div className="w-full">
            <label
              className="block text-sm font-bold my-2 text-left"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Enter The Travel Location"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-bold my-2 text-left"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Enter The Travel Date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        {photo ? (
          <div className="mt-3 rounded border p-2 w-56 m-auto relative">
            <img src={photo} alt="IMAGE_NOT_FOUND" />
            <i
              className="fas fa-times-circle text-black cursor-pointer hover:text-gray-800 transition-all absolute top-0 right-0 -mt-2 -mr-2"
              onClick={() => setPhoto("")}
            ></i>
          </div>
        ) : (
          <button
            className="block m-auto px-4 py-3 rounded bg-green-400 hover:bg-green-500 transition-all text-white mt-3"
            onMouseUp={(e) => ripple.create(e, "light")}
            type="button"
            onClick={() => {
              document.getElementsByClassName("image-uploader")[0].click();
            }}
          >
            <i className="fas fa-cloud-upload-alt mr-2"></i>Choose a Photo
            <input
              type="file"
              className="hidden image-uploader"
              onChange={(e) => uploadImage(e.target.files[0], setPhoto)}
            />
          </button>
        )}
        <label
          className="block text-sm font-bold my-2 text-left"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Enter Travel Description"
          required
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="my-3 bg-green-400 hover:bg-green-500 transition-all py-3 px-10 rounded text-white"
          type="submit"
          onMouseUp={(e) => ripple.create(e, "light")}
        >
          {isAdding ? (
            "Posting..."
          ) : (
            <>
              <i className="fas fa-plus-circle mr-2"></i>Post Blog
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;

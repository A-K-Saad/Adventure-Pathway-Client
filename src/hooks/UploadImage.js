const UploadImage = () => {
  const uploadImage = async (imageToUpload, setImage) => {
    //Hosting the image
    const imageData = new FormData();
    imageData.set("key", "47b2d957da970efd46650889d3040352");
    imageData.append("image", imageToUpload);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    });
    const data = await response.json();
    if (data?.data?.url) {
      setImage(data.data.url);
    }
  };

  return { uploadImage };
};

export default UploadImage;

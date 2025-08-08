import React from "react";
import { useState } from "react";
import AddCampForm from "../../Form/AddCampForm";
import { imageUpload } from "../../../api/utils";

const AddCamp = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [imageUploadError, setImageUploadError] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    try {
      // image url response from imgbb
      const imageUrl = await imageUpload(image);
      console.log(imageUrl);
      setUploadedImage(imageUrl);
    } catch (err) {
      setImageUploadError("Image Upload Failed");
      console.log(err);
    }
  };

  return (
    <div>
      <AddCampForm
        setUploadedImage={setUploadedImage}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        uploadedImage={uploadedImage}
        handleImageUpload={handleImageUpload}
        imageUploadError={imageUploadError}
      />
    </div>
  );
};

export default AddCamp;

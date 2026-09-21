"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";

const ImageLoader = ({ handleFileChange }) => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const uploadToR2 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const response = await apiClient.post("/upload", formData);

    setLoading(false);
    setIsUploaded(true);

    return response.data.url;
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);

    const file = files[0];
    const url = await uploadToR2(file);

    handleFileChange(url);
  };

  return (
    <>
      {loading ? (
        <h2 className="text-blue-600">Uploading....</h2>
      ) : (
        <>
          {isUploaded ? (
            <h2 className="text-blue-600">Image uploaded!</h2>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-6 px-9 rounded-lg text-gray-500 shadow">
              <div>
                <h2 className="font-semibold mb-3">Upload Image</h2>
                <p className="mb-2">JPEG/JPG/PNG only</p>
              </div>
              <div className="border-dashed border-2 border-cyan-700 py-9 px-16 relative">
                <div className="imageLogoAndText">
                  <img src="image.svg" alt="image logo" />
                  <p className="mt-0">drag & drop here</p>
                </div>
                <input
                  type="file"
                  className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  multiple
                  name="imageURL"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileUpload}
                  required
                />
              </div>
              <p>OR</p>
              <Button variant="contained">
                select file
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageLoader;

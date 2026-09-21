"use client";
import React from "react";
import { Carousel } from "flowbite-react";

const ImageSlideshow = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="h-60 sm:h-64 xl:h-80 2xl:h-96 lg:w-4/6 mx-auto flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  const slideImages = images.map((url, i) => (
    <img key={i} className="w-full object-cover" src={url} alt={`image-${i}`} />
  ));

  return (
    <div className="h-60 sm:h-64 xl:h-80 2xl:h-96 lg:w-4/6 mx-auto">
      <Carousel>{slideImages}</Carousel>
    </div>
  );
};

export default ImageSlideshow;

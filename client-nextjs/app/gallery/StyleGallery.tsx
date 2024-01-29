import React, { useState, useEffect } from "react";
import Image from "next/image";

interface StyleGalleryProps {
  _id: string;
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
  onClick?: (name: string) => void;
}

const StyleGallery: React.FC<StyleGalleryProps> = ({
  _id,
  name,
  image,
  innerRef,
  onClick,
}) => {
  const handleClick = () => {
    // Call the onClick callback with the name when the image is clicked
    console.log("onsidee here");
    if (onClick) {
      onClick(_id);
    }
  };

  return (
    <React.Fragment>
      <div className="bg-red-200" ref={innerRef} onClick={handleClick}>
        <div className="max-w-sm rounded relative w-full">
          <div className="relative w-full h-[37vh]">
            <img src={image} alt="he" />
          </div>
          <p>{name}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StyleGallery;

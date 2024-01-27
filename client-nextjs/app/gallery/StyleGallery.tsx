import React from "react";
import Image from "next/image";

interface StyleGalleryProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

const StyleGallery: React.FC<StyleGalleryProps> = ({
  name,
  image,
  innerRef,
}) => {
  return (
    <React.Fragment>
      <div className="" ref={innerRef}>
        <div className="max-w-sm rounded relative w-full">
          <div className="relative w-full h-[37vh]">
            <Image src={image} alt="he" fill className="rounded-xl" />
          </div>
          <p>{name}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StyleGallery;

import React from "react";
import Image from "next/image";
import Masonry from "react-responsive-masonry";
import Dropdown from "./Dropdown";

interface PinterestLayoutProps {
  isLoop?: boolean;
  images?: string[];
}

function PinterestLayout({
  isLoop = false,
  images = [],
}: PinterestLayoutProps) {
  const imageUrls = images.flat();

  return (
    <div>
      <Masonry columnsCount={3} gutter="4px">
        {imageUrls.map((image, index) => (
          <div
            key={index}
            style={{
              height: index % 2 ? "200px" : "250px",
              margin: "1px",
            }}
          >
            <img
              src={image}
              alt="he"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default PinterestLayout;

import React from "react";
import Image from "next/image";
import Masonry from "react-responsive-masonry";

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
    <Masonry columnsCount={3} gutter="10px">
      {imageUrls.map((image, index) => (
        <div
          key={index}
          style={{
            height: index % 2 ? "200px" : "250px",
            background: "#" + Math.floor(Math.random() * 16777215).toString(16),
            margin: "1px",
            borderRadius: "8px",
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
  );
}

export default PinterestLayout;

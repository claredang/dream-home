import React, { useState } from "react";
import Image from "next/image";
import Masonry from "react-responsive-masonry";
import Dropdown from "../_components/Dropdown";
import { HiDotsVertical } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";

interface UserBoardProps {
  isLoop?: boolean;
  images?: { url: string; _id: string }[];
}

function UserBoard({ isLoop = false, images = [], getSave }: UserBoardProps) {
  const imageUrls = images.flat();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const unsaveFromBoard = async (_id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            image_id: _id,
          }),
        }
      );
      const data = await response.json();

      console.log("Server response:", data);
      getSave();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <Masonry columnsCount={3} gutter="4px">
        {images.map(({ url, _id }, index) => (
          <div
            key={index}
            style={{
              // width: index % 2 ? "200px" : "250px",
              // height: index % 2 ? "200px" : "250px",
              margin: "1px",
              position: "relative",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={url}
              alt="he"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* {hoveredIndex === index && ( */}
            <div style={{ position: "absolute", top: 0, right: 2 }}>
              <Dropdown
                options={[
                  {
                    text: "Unsave",
                    onClick: () => unsaveFromBoard(_id),
                  },
                ]}
              />
            </div>
            {/* )} */}
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default UserBoard;

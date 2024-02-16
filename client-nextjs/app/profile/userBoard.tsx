import React, { useState } from "react";
import Image from "next/image";
import Masonry from "react-responsive-masonry";
import Dropdown from "../_components/Dropdown";
import { HiDotsVertical } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";

interface UserBoardProps {
  isLoop?: boolean;
  images?: string[];
}

function UserBoard({ isLoop = false, images = [] }: UserBoardProps) {
  const imageUrls = images.flat();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const unsaveFromBoard = async () => {
    try {
      const response = await fetch(`http://localhost:8080/design-inspiration`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          //   image_id: _id,
        }),
      });
      const data = await response.json();

      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <Masonry columnsCount={3} gutter="4px">
        {imageUrls.map((image, index) => (
          <div
            key={index}
            style={{
              height: index % 2 ? "200px" : "250px",
              margin: "1px",
              position: "relative",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
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
            {hoveredIndex === index && (
              <div style={{ position: "absolute", top: 0, left: 0 }}>
                <Dropdown
                  options={[
                    {
                      text: "Save Image",
                      onClick: () => console.log("Save image clicked"),
                    },
                    {
                      text: "Delete Image",
                      onClick: () => console.log("Delete image clicked"),
                    },
                  ]}
                  icon={<CiBookmark />} // Provide your custom icon component here
                  buttonText="Options" // Provide custom button text here
                />
              </div>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default UserBoard;

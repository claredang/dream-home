import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface StyleGalleryProps {
  _id: string;
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
  onClick?: (name: string) => void;
  index: number;
}

const StyleGallery: React.FC<StyleGalleryProps> = ({
  _id,
  name,
  image,
  index,
  innerRef,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);
  const getSave = async () => {
    console.log("insude here");
    try {
      console.log("insude here");
      // Your server endpoint where you want to send the data

      // Assuming your server expects a POST request with a JSON payload
      const response = await fetch(`http://localhost:8080/design-inspiration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "kwonbetty@gmail.com",
          image_id: _id,
        }),
      });
      const data = await response.json();
      // setImageUrls(data);

      // Handle the server response as needed
      console.log("Server response:", data);
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };

  const handleClick = () => {
    // Call the onClick callback with the name when the image is clicked
    if (onClick) {
      setSelected((prevSelected) => !prevSelected);
      onClick(_id);
      // setSelected((prevSelected) => !prevSelected);
    }
    getSave();
  };

  return (
    <React.Fragment>
      <div className="" ref={innerRef} onClick={handleClick}>
        <div
          style={{
            position: "relative",
            height: index % 2 ? "200px" : "250px",
            // background: "#" + Math.floor(Math.random() * 16777215).toString(16),
            margin: "2px",
            // borderRadius: "8px",
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
          {selected && (
            <button
              className=""
              style={{
                position: "absolute", // Add absolute positioning to the button
                top: 0,
                right: 10,
                // background: selected ? "#ffffff" : "#000000",
                border: "none",
                borderRadius: "50%",
                padding: "5px",
                cursor: "pointer",
                // color: selected ? "#ffffff" : "#000000", // Change text color based on selection
              }}
              // onClick={handleCloseChat}
            >
              {/* <Image
                src="check.svg"
                alt="check-button"
                width={16}
                height={14}
              /> */}
              <FaCheckCircle color="#304561" size={20} />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StyleGallery;

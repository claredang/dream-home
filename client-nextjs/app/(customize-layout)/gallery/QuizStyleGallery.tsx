import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface QuizStyleGalleryProps {
  _id: string;
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
  onClick?: (name: string) => void;
  index: number;
}

const QuizStyleGallery: React.FC<QuizStyleGalleryProps> = ({
  _id,
  name,
  image,
  index,
  innerRef,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (onClick) {
      setSelected((prevSelected) => !prevSelected);
      onClick(_id);
    }
  };

  return (
    <React.Fragment>
      <div className="" ref={innerRef} onClick={handleClick}>
        <div
          style={{
            position: "relative",
            height: index % 2 ? "200px" : "250px",
            margin: "2px",
          }}
        >
          <img
            src={image}
            alt="image options"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {selected && (
            <button className="absolute top-0 right-2 border-none rounded-full p-2 cursor-pointer">
              <FaCheckCircle color="#304561" size={20} />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizStyleGallery;

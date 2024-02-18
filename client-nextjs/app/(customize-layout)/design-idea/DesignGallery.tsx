import React, { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import LoginModal from "@/app/_components/LoginModal";
import { CiBookmark } from "react-icons/ci";

interface StyleGalleryProps {
  _id: string;
  email?: null | string;
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
  onClick?: (name: string) => void;
  index: number;
}

const StyleGallery: React.FC<StyleGalleryProps> = ({
  _id,
  email,
  name,
  image,
  index,
  innerRef,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const saveToBoard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            image_id: _id,
          }),
        }
      );
      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const unsaveFromBoard = async () => {
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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleClick = () => {
    if (onClick) {
      if (user) {
        setSelected((prevSelected) => !prevSelected);
        onClick(_id);
      } else {
        setShowModal(true);
      }
    }
    if (!selected) {
      if (user) {
        saveToBoard();
      }
    } else {
      unsaveFromBoard();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
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
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <button className="absolute top-0 right-2 p-2 cursor-pointer">
          <div
            className={`w-6 h-6 rounded-full overflow-hidden flex justify-center items-center ${
              selected ? "bg-red-300" : "bg-white"
            }`}
          >
            <CiBookmark />
          </div>
        </button>
      </div>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginModal isOpen={showModal} onClose={closeModal}></LoginModal>
        </Suspense>
      )}
    </div>
  );
};

export default StyleGallery;

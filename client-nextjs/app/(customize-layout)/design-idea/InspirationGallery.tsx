import React, { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import LoginModal from "@/app/_components/LoginModal";
import { CiBookmark } from "react-icons/ci";
import { LoginForm } from "@/app/login/form";

interface InspirationGalleryProps {
  _id: string;
  email?: null | string;
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
  onClick?: (name: string) => void;
  index: number;
}

const InspirationGallery: React.FC<InspirationGalleryProps> = ({
  _id,
  email,
  name,
  image,
  index,
  innerRef,
  onClick,
}) => {
  const [selected, setSelected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [collections, setCollections] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;

  const getSave = async () => {
    console.log("inside here: ");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration-user`,
        // `http://localhost:8080/design-inspiration-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email,
          }),
        }
      );

      const data = await response.json();
      setCollections(data);

      console.log("Server response:", data, collections);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const saveToBoard = async (boardName: string) => {
    console.log("board collection album: ", boardName);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration`,
        // `http://localhost:8080/design-inspiration`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            image_id: _id,
            collection: boardName,
          }),
        }
      );
      const data = await response.json();
      setShowSaveModal(false);
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

  const handleInputChange = (event) => {
    setBoardName(event.target.value);
  };

  const saveExistingBoard = (boardName: string) => {
    setBoardName(boardName);
    saveToBoard(boardName);
  };

  const handleClick = () => {
    if (onClick) {
      if (user) {
        setSelected((prevSelected) => !prevSelected);
        onClick(_id);
        setShowSaveModal(true);
        getSave();
      } else {
        setShowLoginModal(true);
      }
    }
    if (!selected) {
      if (user) {
        // saveToBoard();
      }
    } else {
      unsaveFromBoard();
    }
  };

  const openModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const closeSaveModal = () => {
    setShowSaveModal(false);
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
      {showLoginModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginModal
            isOpen={showLoginModal}
            onClose={closeLoginModal}
            imageUrl="/house-2.jpg"
          >
            <p className="regular-18 text-gray-50 pb-4">
              Join Dream Home to save your inspiration!
            </p>
            <LoginForm />
          </LoginModal>
        </Suspense>
      )}
      {showSaveModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginModal
            isOpen={showSaveModal}
            onClose={closeSaveModal}
            imageUrl="/house-2.jpg"
          >
            <p className="regular-20 mb-1">Save to Board</p>

            <input
              type="text"
              value={boardName}
              onChange={handleInputChange}
              placeholder="Create new board name"
              className="mb-5 bg-gray-100 px-4 py-2 rounded-2xl opacity-50 text-gray-50"
            />
            <div className="mb-5">
              {collections.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-3"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src="/house-2.jpg"
                      style={{
                        width: "50px",
                        height: "50px",
                        margin: "1px",
                      }}
                      className="rounded-md"
                    />
                    <div className="flex flex-col">
                      <label>{item.collection}</label>
                      <label className="text-gray-50 text-sm">
                        {item.images.length} items
                      </label>
                    </div>
                  </div>
                  <div className="w-6 h-6">
                    <CiBookmark
                      style={{ cursor: "pointer" }}
                      className="w-6 h-6  hover:text-yellow-100"
                      onClick={() => {
                        saveExistingBoard(item.collection);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => saveToBoard(boardName)}
              disabled={!boardName.trim()}
              className={
                !boardName.trim()
                  ? "bg-gray-300 px-4 py-2 rounded-2xl cursor-not-allowed opacity-50"
                  : "font-bold p-2 rounded-2xl btn-yellow"
              }
            >
              Create Board
            </button>
          </LoginModal>
        </Suspense>
      )}
    </div>
  );
};

export default InspirationGallery;

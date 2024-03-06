"use client";
import Navbar from "../_components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserBoard from "./userBoard";
import Masonry from "react-responsive-masonry";
import Dropdown from "../_components/Dropdown";
import { useRouter } from "next/navigation";
import { replaceBlankSpaceWithHyphen } from "../_utilities/sharedFunction";

export default function Save({ email }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [collections, setCollections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getSave();
    console.log("Collections updated:", collections);
  }, []);

  const getSave = async () => {
    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration-user`,
        `http://localhost:8080/design-inspiration-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.email,
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

  const createPlaceholders = (length) => {
    // console.log("inside here: ", length);
    const placeholders = [];
    for (let i = length; i < 6; i++) {
      placeholders.push(
        // <Masonry columnsCount={3} gutter="1px">
        <div
          key={`placeholder-${i}`}
          style={{
            width: "100px",
            height: "100px",
            margin: "1px",
          }}
          className="bg-gray-300"
        ></div>
        // </Masonry>
      );
    }
    return placeholders;
  };

  const deleteBoard = async (board_name: string) => {
    console.log("name, board: ", email.email, board_name);
    try {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration`,
        `http://localhost:8080/design-board`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.email,
            board: board_name,
          }),
        }
      );
      const data = await response.json();

      console.log("Delete board Server response:", data);
      getSave();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      {/* <UserBoard images={imageUrls} isLoop={true} getSave={getSave} /> */}

      <div className="flex bg-pink-100">
        {collections.map((item, index) => (
          <div key={index} className="m-5">
            <div className="flex ">
              <p>{item.collection}</p>

              {/* <Dropdown
                options={[
                  {
                    text: "Unsave",
                    onClick: () => deleteBoard(item.collection),
                  },
                ]}
              /> */}
            </div>
            <div
              className="flex bg-beige-50 min-w-[400px]"
              onClick={() =>
                router.push(
                  `profile/board/${replaceBlankSpaceWithHyphen(
                    item.collection
                  )}`
                )
              }
            >
              <Masonry columnsCount={3} gutter="1px">
                {item.images.map((image, i) => (
                  <img
                    key={i}
                    src={image.url}
                    alt={`Image ${i + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "1px",
                    }}
                  />
                ))}
                {createPlaceholders(item.images.length)}
              </Masonry>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

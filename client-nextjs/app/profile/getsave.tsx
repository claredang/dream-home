"use client";
import Navbar from "../_components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserBoard from "./userBoard";
import Masonry from "react-responsive-masonry";
import Dropdown from "../_components/Dropdown";

export default function Save({ email }) {
  const [imageUrls, setImageUrls] = useState([]);
  const [collections, setCollections] = useState([]);

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

      // const urls = data
      //   .filter((arr) => arr.length > 0) // Filter out empty arrays
      //   .flatMap((arr) =>
      //     arr.map((item) => ({ url: item.url, _id: item._id }))
      //   ); //
      // setImageUrls(urls);

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

      <div className="flex flex-col">
        {collections.map((item, index) => (
          <div key={index} className="flex flex-col max-w-[300px]">
            <div className="flex justify-between">
              <p>{item.collection}</p>

              <Dropdown
                options={[
                  {
                    text: "Unsave",
                    onClick: () => deleteBoard(item.collection),
                  },
                ]}
              />
            </div>
            <div className="flex bg-beige-50">
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

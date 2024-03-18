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
        `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration-user`,
        // `http://localhost:8080/design-inspiration-user`,
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
    const placeholders = [];
    for (let i = length; i < 6; i++) {
      placeholders.push(
        <div
          key={`placeholder-${i}`}
          style={{
            height: "100px",
            margin: "1px",
          }}
          className="bg-gray-300"
        ></div>
      );
    }
    return placeholders;
  };

  const deleteBoard = async (board_name: string) => {
    console.log("name, board: ", email.email, board_name);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/design-board`,
        // `http://localhost:8080/design-board`,
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
      <div className="flex">
        {collections.map((item, index) => (
          <div key={index} className="m-5">
            <div className="flex">
              <p className="regular-18">{item.collection}</p>
              <Dropdown
                options={[
                  {
                    text: "Delete board",
                    onClick: () => deleteBoard(item.collection),
                  },
                ]}
              />
            </div>
            <div
              className="flex bg-beige-50 min-w-[400px]"
              // onClick={() =>
              //   router.push(
              //     `profile/board/${replaceBlankSpaceWithHyphen(
              //       item.collection
              //     )}`
              //   )
              // }
            >
              <Masonry columnsCount={3} gutter="1px">
                {item.images.map((image, i) => (
                  <div
                    key={index}
                    style={{
                      // width: index % 2 ? "200px" : "250px",
                      // height: index % 2 ? "200px" : "250px",
                      margin: "1px",
                      position: "relative",
                    }}
                  >
                    <img
                      key={i}
                      src={image.url}
                      alt={`Image ${i + 1}`}
                      style={{
                        height: "100px",
                        margin: "1px",
                      }}
                    />
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
                  </div>
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

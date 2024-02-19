"use client";
import Navbar from "../_components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserBoard from "./userBoard";

export default function Save({ email }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    getSave();
  }, []);

  const getSave = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/design-inspiration-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.email,
          }),
        }
      );
      const data = await response.json();

      const urls = data
        .filter((arr) => arr.length > 0) // Filter out empty arrays
        .flatMap((arr) =>
          arr.map((item) => ({ url: item.url, _id: item._id }))
        ); //
      setImageUrls(urls);

      console.log("Server response:", data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <UserBoard images={imageUrls} isLoop={true} getSave={getSave} />
    </>
  );
}

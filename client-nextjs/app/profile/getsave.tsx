"use client";
import Navbar from "../_components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import UserBoard from "./userBoard";

export default function Save({ email }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    getSave();
  }, []);
  console.log("email: ", email.email);

  const getSave = async () => {
    try {
      console.log("inside getsave");
      // Your server endpoint where you want to send the data
      const endpoint = `http://localhost:8080/design-inspiration`;

      // Assuming your server expects a POST request with a JSON payload
      const response = await fetch(
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
      const urls = data
        .filter((arr) => arr.length > 0) // Filter out empty arrays
        .flatMap((arr) => arr.map((obj) => obj.url)); // Extract URLs
      setImageUrls(urls);

      // Handle the server response as needed
      console.log("Server response:", data);
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <UserBoard images={imageUrls} isLoop={true} />
    </>
  );
}

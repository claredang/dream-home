"use client";
import { ShowcaseCard } from "./ShowcaseCard";
import Slideshow from "../_components/ImageSlider";
import { useState, useEffect } from "react";
import Image from "next/image";

const Intro = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    getSave();
  }, []);

  const getSave = async () => {
    console.log("insude here");
    try {
      console.log("insude here");
      // Your server endpoint where you want to send the data
      const endpoint = `http://localhost:8080/design-inspiration`;

      // Assuming your server expects a POST request with a JSON payload
      const response = await fetch(
        `http://localhost:8080/design-inspiration-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "kwonbetty@gmail.com",
          }),
        }
      );
      const data = await response.json();
      setImageUrls(data);

      // Handle the server response as needed
      console.log("Server response:", imageUrls);
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };
  return (
    <section className="2xl:max-container relative flex flex-col pb-10 lg:mb-10 lg:pb-0 xl:mb-10">
      <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <Slideshow
          images={[
            "house-1.jpg",
            "house-2.jpg",
            "house-3.jpg",
            "house-4.jpg",
            "house-7.jpg",
            "house-8.jpg",
          ]}
        />
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-slate-50 p-8 lg:max-w-[500px] xl:max-w-[500px] xl:rounded-5xl xl:px-10 xl:py-10 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-black">
            Have you ever wonder what is your <strong>interior style</strong>?
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-black">
            We help you identify your dream home style! Welcome to our website
            where you can discover the perfect home style that suits your taste
            and preferences 🏡✨
          </p>
        </div>

        <button onClick={getSave}>retrieve</button>
        {imageUrls.map((image, index) => (
          <Image
            key={index}
            src={image["url"]}
            alt={`Image ${index}`}
            width={300}
            height={300}
          />
        ))}
      </div>
    </section>
  );
};

export default Intro;

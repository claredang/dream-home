"use client";
import Image from "next/image";

import { MotionDiv } from "../../_components/Motion";

import { CiBookmark } from "react-icons/ci";

const stagger = 0.25;

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export interface ExploreProp {
  _id: any;
  title: string;
  interior_style: string;
  location: string;
  price: string;
  rating: string;
  image_url: Array<string>;
}

interface Prop {
  explore: ExploreProp;
  index: number;
}

function ExploreCard({ explore, index }: Prop) {
  console.log("image url: ", explore._id);
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
          image_url: explore._id,
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
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full"
    >
      <div className="relative w-full h-[37vh]">
        <Image
          src={explore.image_url[0]}
          alt={explore.title}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="py-2 flex flex-col gap-1">
        <div className="flex justify-between items-center gap-1">
          <h2 className="text-black w-full min-h-[30px]">{explore.title}</h2>
          <Image
            src="./star.svg"
            alt="star"
            width={18}
            height={18}
            className="object-contain"
          />
          <p className="text-basefont-bold">{explore.rating}</p>
        </div>
        <div className="text-gray-50">
          <p>{explore.interior_style}</p>
          <p>{explore.location}</p>
          <p className="text-black">{explore.price}</p>
        </div>
        <button onClick={getSave}>
          <CiBookmark />
        </button>
      </div>
    </MotionDiv>
  );
}

export default ExploreCard;

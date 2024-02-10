"use client";
import Image from "next/image";
const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 4000;

import { useState, useRef, useEffect } from "react";
export default function Slideshow({ images }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow mx-auto overflow-hidden w-full">
      <div
        className="slideshowSlider whitespace-nowrap transition ease duration-1000"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div
            className={`slide relative inline-flex h-[600px] rounded-3xl mr-3 ${
              index === images.length - 1 ? "w-full" : "w-4/5"
            }`}
            key={index}
          >
            <Image
              src={`/${image}`}
              alt="bg-cover"
              fill
              className="rounded-3xl"
            />
          </div>
        ))}
      </div>

      <div className="slideshowDots text-center">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${
              index === idx ? "bg-red-200" : ""
            } inline-block h-3 w-3 rounded-full cursor-pointer m-3 mx-3 my-0 bg-gray-300`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

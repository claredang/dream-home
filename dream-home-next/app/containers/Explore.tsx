"use client";
import { EXPLORE_LINKS } from "@/app/constants";
import Image from "next/image";
import React, { useState } from "react";

interface Visibility {
  [key: string]: boolean;
}

const Explore = () => {
  const [visibility, setVisibility] = useState<Visibility>({});

  const handleToggle = (columnsTitle: string) => {
    setVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnsTitle]: !prevVisibility[columnsTitle],
    }));
  };
  return (
    <section>
      <div className="flexCenter flex-col">
        <div className="padding-container max-container w-full lg:pb-10">
          <Image src="/camp.svg" alt="camp" width={50} height={50} />
          <p className="regular-18 -mt-1 mb-3 text-gray-30">
            Discover your perfect home style
          </p>
          <div className="flex flex-col sm:flex-row gap-5 lg:gap-10">
            <h2 className="flex lg:w-1/2 xs:w-full bold-40 lg:bold-64">
              Services
            </h2>
            <div className="flex flex-col lg:w-1/2 regular-16 text-gray-30">
              {EXPLORE_LINKS.map((columns, index) => (
                <div key={index}>
                  <div className="border bg-black" />
                  <div className="p-4">
                    <button
                      onClick={() => handleToggle(columns.title)}
                      className="flex items-center p-2 rounded-full w-full"
                    >
                      <div title={columns.title}>{columns.title}</div>
                      <div className="flex-grow" />
                      {visibility[columns.title] ? (
                        <span className="ml-2">-</span>
                      ) : (
                        <span className="ml-2">+</span>
                      )}
                    </button>
                    {visibility[columns.title] && (
                      <ul className="p-2 regular-14 flex flexStart flex-col gap-4 text-gray-30">
                        <div>{columns.description}</div>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;

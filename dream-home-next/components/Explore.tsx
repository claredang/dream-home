"use client";
import { EXPLORE_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Explore = () => {
  const [visibility, setVisibility] = useState({});

  const handleToggle = (columnsTitle: any) => {
    setVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnsTitle]: !prevVisibility[columnsTitle],
    }));
  };
  return (
    <section>
      <div className="flexCenter flex-col">
        <div className="padding-container max-container w-full pb-24">
          <Image src="/camp.svg" alt="camp" width={50} height={50} />
          <p className="regular-18 -mt-1 mb-3 text-gray-30">
            Discover your perfect home style
          </p>
          <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
            <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Services</h2>
            <div className="regular-16 text-gray-30 xl:max-w-[520px]">
              {EXPLORE_LINKS.map((columns, index) => (
                <div key={index}>
                  <div className="border bg-black" />

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
                    <ul className="regular-14 flex flexStart flex-col gap-4 text-gray-30">
                      <div>{columns.description}</div>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="flexCenter max-container relative w-full">
          <Image
            src="/home-cover-4.jpg"
            alt="boat"
            width={1440}
            height={580}
            className="w-full object-cover object-center 2xl:rounded-5xl"
          />

          <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
            <Image
              src="/meter.svg"
              alt="meter"
              width={16}
              height={158}
              className="h-full w-auto"
            />
            <div className="flexBetween flex-col">
              <div className="flex w-full flex-col">
                <div className="flexBetween w-full">
                  <p className="regular-16 text-gray-20">Destination</p>
                  <p className="bold-16 text-green-50">48 min</p>
                </div>
                <p className="bold-20 mt-2">Aguas Calientes</p>
              </div>

              <div className="flex w-full flex-col">
                <p className="regular-16 text-gray-20">Start track</p>
                <h4 className="bold-20 mt-2 whitespace-nowrap">
                  Wonorejo Pasuruan
                </h4>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Explore;

"use client";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Test = () => {
  const [visibility, setVisibility] = useState({});

  const handleToggle = (columnsTitle: any) => {
    setVisibility((prevVisibility: any) => ({
      ...prevVisibility,
      [columnsTitle]: !prevVisibility[columnsTitle],
    }));
  };
  return (
    <section>
      {/* <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-row items-start justify-between gap-[10%] md:flex-row">
          <div className="items-start">Service</div>
          {FOOTER_LINKS.map((columns, index) => (
            <div key={index}>
              <button
                onClick={() => handleToggle(columns.title)}
                className="flex items-center p-2 rounded-full"
              >
                {visibility[columns.title] ? (
                  <span className="mr-2">-</span>
                ) : (
                  <span className="mr-2">+</span>
                )}
                <div title={columns.title}>{columns.title}</div>
              </button>
              {visibility[columns.title] && (
                <ul className="regular-14 flex flex-col gap-4 text-gray-30 max-w-1/2">
                  {columns.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="/">{link}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border bg-gray-20" />
      </div> */}

      <div className="flexCenter flex-col">
        <div className="padding-container max-container w-full pb-24">
          <Image src="/camp.svg" alt="camp" width={50} height={50} />
          <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
            We are here for you
          </p>
          <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
            <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">
              Guide You to Easy Path
            </h2>
            {/* <p className="regular-16 text-gray-30 xl:max-w-[520px]">
              Only with the hilink application you will no longer get lost and
              get lost again, because we already support offline maps when there
              is no internet connection in the field. Invite your friends,
              relatives and friends to have fun in the wilderness through the
              valley and reach the top of the mountain
            </p> */}
            <div className="regular-16 text-gray-30 xl:max-w-[520px]">
              {FOOTER_LINKS.map((columns, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleToggle(columns.title)}
                    className="flex items-center p-2 rounded-full"
                  >
                    {visibility[columns.title] ? (
                      <span className="mr-2">-</span>
                    ) : (
                      <span className="mr-2">+</span>
                    )}
                    <div title={columns.title}>{columns.title}</div>
                  </button>
                  {visibility[columns.title] && (
                    <ul className="regular-14 flex flex-col gap-4 text-gray-30 max-w-1/2">
                      {columns.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href="/">{link}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flexCenter max-container relative w-full">
          <Image
            src="/boat.png"
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
        </div>
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

export default Test;

import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { SERVICE_LINKS } from "@/constants";

const Service = () => {
  return (
    <section className="2xl:max-container flexCenter flex-col bg-beige-50 lg:h-[500px] pb-10 lg:mb-10 lg:pb-10 xl:mb-10">
      <div className="flex bold-20 pt-5">Welcome to Dream Home</div>
      <div className="flex flex-col sm:flex-row sm:gap-2 md:gap-3 lg:gap-8 md:m-3 md:p-3 lg:m-6 lg:p-6">
        {SERVICE_LINKS.map((columns) => (
          <div className="lg:m-6 lg:p-6 align-baseline">
            <ul className="min-h-full regular-14 flex flex-col gap-4 text-black">
              <p className="flex-1 py-3 my-3 bold-20">{columns.title}</p>
              <p className="lg:pb-4 lg:mt-4 lg:mb-5">{columns.description}</p>
              <div className="w-3/4">
                <Button
                  type="link"
                  title={columns.button}
                  variant="btn_black"
                  link={columns.href}
                  full={false}
                />
              </div>
            </ul>
          </div>
        ))}
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
export default Service;

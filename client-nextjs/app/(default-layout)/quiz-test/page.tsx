"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/Button";
// import QuizCard from "./QuizCard";
import QuizCard from "./quiz-card/page";
import QuizResult from "./QuizResult";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default function QuizTest() {
  return (
    <div className="flex-row">
      <div className="flexCenter lg:max-container relative w-full lg:pb-12 pb-5">
        <div className="hide-scrollbar flex w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
          <Image
            src="/home-cover-4.jpg"
            alt="Home Cover"
            width={1440}
            height={700}
            className="h-full w-full min-w-[1100px] bg-home-cover-1 bg-cover bg-no-repeat"
          />
        </div>
        <div className="flex absolute flex-col bg-white lg:py-8 py-5 pl-5 pr-7 gap-5 rounded-3xl border shadow-md items-center text-center ">
          <p className="flex-wrap xs:bold-20 md:bold-32 lg:bold-60 lg:max-w-[400px] text-blue-100">
            Find your interior design style
          </p>
          <p className="text-gray-50">
            Take our interior design style quiz to discover your unique home
            style!
          </p>
          <button className="btn-yellow">
            <Link href="/gallery">Pick Images Styles You Like</Link>
          </button>
          <button className="btn-yellow">
            <Link href="/quiz-test/quiz-card">Answer Questions</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

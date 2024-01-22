"use client";
import Intro from "@/app/containers/Intro";
import Service from "@/app/containers/Service";
import Showcase from "@/app/containers/Showcase";
import Explore from "@/app/containers/Explore";

export default function Home() {
  return (
    <>
      <Intro />
      <Service />
      <Explore />
      <Showcase />
    </>
  );
}

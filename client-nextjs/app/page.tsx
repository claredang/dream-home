"use client";
import Intro from "@/app/containers/Intro";
import Service from "@/app/containers/Service";
import Showcase from "@/app/containers/Showcase";
import Explore from "@/app/containers/Explore";
import QuizService from "./containers/QuizService";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      {/* <Service /> */}
      <Explore />
      <QuizService />
      <Showcase />
      <Footer />
    </>
  );
}

// "use client";
// import React, { lazy, Suspense } from "react";

// const Intro = lazy(() => import("@/app/containers/Intro"));
// const Service = lazy(() => import("@/app/containers/Service"));
// const Showcase = lazy(() => import("@/app/containers/Showcase"));
// const Explore = lazy(() => import("@/app/containers/Explore"));
// const QuizService = lazy(() => import("./containers/QuizService"));
// const Footer = lazy(() => import("./_components/Footer"));

// export default function Home() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Intro />
//       {/* <Service /> */}
//       <Explore />
//       <QuizService />
//       <Showcase />
//       <Footer />
//     </Suspense>
//   );
// }

// import React from 'react'

// const explorePage = () => {
//   return (
//     <div>explorePage</div>
//   )
// }

// export default explorePage

import Intro from "@/components/Intro";
import Service from "@/components/Service";
import Showcase from "@/components/Showcase";
import Explore from "@/components/Explore";
import { fetchAnime } from "../app/action";

import LoadMore from "../components/LoadMore";

export default function explorePage({ data }: { data: any }) {
  //   const data = await fetchAnime(1);
  return (
    <div className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Anime</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </div>
      <LoadMore />
    </div>
  );
}

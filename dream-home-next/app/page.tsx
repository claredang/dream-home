import Intro from "@/components/Intro";
import Service from "@/components/Service";
import Showcase from "@/components/Showcase";
import Explore from "@/components/Explore";
import { fetchAnime } from "./action";

import LoadMore from "../components/LoadMore";
import ExplorePage from "@/pages/explorePage";

export default async function Home() {
  const data = await fetchAnime(1);
  return (
    <>
      {/* <Intro />
      <Service />
      <Explore />
      <Showcase /> */}

      <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
        <h2 className="text-3xl text-white font-bold">Explore Anime</h2>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data}
        </section>
        <LoadMore />
      </main>
    </>
  );
}

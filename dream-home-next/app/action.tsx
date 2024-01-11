// "use server";

// import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

// const MAX_LIMIT = 8;

// export async function fetchAnime(page: number) {
//   const response = await fetch(
//     `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`
//   );

//   const data = await response.json();

//   return data.map((anime: AnimeProp, index: number) => (
//     <AnimeCard key={anime.id} anime={anime} index={index} />
//   ));
// }

"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import ExploreCard, { ExploreProp } from "@/components/ExploreCard";

const MAX_LIMIT = 8;

export async function fetchAnime(page: number) {
  const response = await fetch(`https://dream-home-org.onrender.com/explore`);

  const data = await response.json();

  return data.map((explore: ExploreProp, index: number) => (
    <ExploreCard key={explore.id} explore={explore} index={index} />
  ));
}

"use server";
import ExploreCard, { ExploreProp } from "@/components/ExploreCard";

const MAX_LIMIT = 8;

export async function fetchExploreImage(page: number) {
  const response = await fetch(`https://dream-home-org.onrender.com/explore`);

  const data = await response.json();

  return data.map((explore: ExploreProp, index: number) => (
    <ExploreCard key={explore.id} explore={explore} index={index} />
  ));
}

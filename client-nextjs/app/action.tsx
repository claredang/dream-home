"use server";
import ExploreCard, {
  ExploreProp,
} from "@/app/(default-layout)/explore/ExploreCard";

const MAX_LIMIT = 8;

export async function fetchExploreImage(page: number) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/explore`);
  // const data = await response.json();

  const url = "https://interior-design.p.rapidapi.com/explore?limit=5";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aefa0b0514msh3640bed410ad6ecp1e490bjsneeb4c9d8be70",
      "X-RapidAPI-Host": "interior-design.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("data: ", data);

  return data.map((explore: ExploreProp, index: number) => (
    <ExploreCard key={explore.id} explore={explore} index={index} />
  ));
}

export async function fetchChatbotKey() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/chatbot`);
  const data = await response.json();
  return data.chatbot;
}

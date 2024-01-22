"use server";
import ExploreCard, { ExploreProp } from "@/app/explore/ExploreCard";

const MAX_LIMIT = 8;

export async function fetchExploreImage(page: number) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/explore`);
  const response = await fetch("http://localhost:8080/explore");
  const data = await response.json();

  return data.map((explore: ExploreProp, index: number) => (
    <ExploreCard key={explore.id} explore={explore} index={index} />
  ));
}

export async function fetchChatbotKey() {
  const response = await fetch(`http://localhost:8080/chatbot`);
  const data = await response.json();
  return data.chatbot;
}

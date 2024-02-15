"use client";
import StyleGallery from "../gallery/StyleGallery";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-responsive-masonry";

async function getStyleGallery({ pageParam }: { pageParam: number }) {
  //   const res = await fetch(
  //     `https://pokeapi.co/api/v2/ability?limit=20&offset=${pageParam}`
  //   );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/style?limit=20&offset=${pageParam}`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  let filtered = await data.results.map((style: {}, index: number) => {
    let paddedIndex =
      pageParam === 0
        ? ("00" + (index + 1)).slice(-3)
        : ("00" + (index + 1 + pageParam)).slice(-3);

    const image = `https://assets.style.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    return {
      ...style,
      //   imageUrl: image,
    };
  });
  return filtered;
}

export default function Inspiration() {
  const { ref, inView } = useInView();

  const {
    data: pokemons,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: getStyleGallery,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 20 ? allPages.length * 20 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // State to track selected image names
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Callback function to handle image click
  const handleImageClick = (_id: string) => {
    // Check if the _id is already in the array
    if (selectedIds.includes(_id)) {
      // Remove the _id from the array
      setSelectedIds((prevSelected) => prevSelected.filter((id) => id !== _id));
    } else {
      // Add the _id to the array
      setSelectedIds((prevSelected) => [...prevSelected, _id]);
    }
  };
  // Filter out names based on selected _ids
  const selectedNames = pokemons?.pages
    ?.flat()
    .filter((style) => selectedIds.includes(style._id))
    .map((style) => style.style);

  const [quizResultData, setQuizResult] = useState({
    resultFinal: null,
  });

  return (
    <main className="p-2">
      <div className="flex flex-col sm:flex-row lg:py-10 lg:px-12">
        <div className="lg:w-1/2 md:w-1/3 xs:w-full flex-col items-center justify-between p-6 ml-5">
          <p className="regular-40 mb-4">
            Select the rooms that make you swoon.
          </p>
          <p className="regular-18">
            Decisions are hard. Pick as many as you want!
          </p>
        </div>
        <div className="w-full md:w-2/3 sm:w-1/2 relative">
          <Masonry columnsCount={3} gutter="10px">
            {pokemons?.pages?.map((page) =>
              page.map(
                (
                  style: {
                    imageUrl: string;
                    name: string;
                  },
                  index: number
                ) => {
                  if (page.length === index + 1) {
                    return (
                      <StyleGallery
                        _id={style._id}
                        image={style.url}
                        name={style.style}
                        key={index}
                        index={index}
                        innerRef={ref}
                        onClick={handleImageClick}
                      />
                    );
                  } else {
                    return (
                      <StyleGallery
                        _id={style._id}
                        image={style.url}
                        name={style.style}
                        key={index}
                        index={index}
                        onClick={handleImageClick}
                      />
                    );
                  }
                }
              )
            )}
          </Masonry>
        </div>
      </div>
    </main>
  );
}

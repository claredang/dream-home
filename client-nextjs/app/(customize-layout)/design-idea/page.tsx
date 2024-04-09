"use client";
import InspirationGallery from "./InspirationGallery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { useSession } from "next-auth/react";

async function getInspirationGallery({ pageParam }: { pageParam: number }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/style?limit=20&offset=${pageParam}`
  );
  if (!res.ok) {
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
  const { data: session } = useSession();
  const user = session?.user;
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
    queryFn: getInspirationGallery,
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

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleImageClick = (_id: string) => {
    if (selectedIds.includes(_id)) {
      setSelectedIds((prevSelected) => prevSelected.filter((id) => id !== _id));
    } else {
      setSelectedIds((prevSelected) => [...prevSelected, _id]);
    }
  };

  return (
    <main className="p-2">
      <div className="flex flex-col lg:py-10 lg:px-12">
        <p className="regular-32 mb-4">
          Interior Design Ideas To Inspire Every Room In Your Home
        </p>
        <p className="lg:w-1/2 w-full regular-16 mb-6">
          Browse a selection of interior design ideas and modern layouts that
          will inspire every inch of your home - from the dining room and
          bedroom to the patio.
        </p>
        <div className="w-full relative">
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
                      <div>
                        <InspirationGallery
                          _id={style._id}
                          email={user?.email}
                          image={style.url}
                          name={style.style}
                          key={index}
                          index={index}
                          innerRef={ref}
                          onClick={handleImageClick}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <InspirationGallery
                        _id={style._id}
                        email={user?.email}
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

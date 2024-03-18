"use client";
import StyleGallery from "./StyleGallery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import QuizResult from "../../(default-layout)/quiz-test/QuizResult";
import Masonry from "react-responsive-masonry";
import LoadingSpinner from "../../../public/spinner-square.svg";
import Image from "next/image";

async function getStyleGallery({ pageParam }: { pageParam: number }) {
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

export default function Home() {
  const { ref, inView } = useInView();

  const {
    data: images,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: getStyleGallery,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 20 ? allPages.length * 20 : undefined;
      return nextPage;
    },
  });

  console.log("fetch next page: ", isFetchingNextPage);

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

  const selectedNames = images?.pages
    ?.flat()
    .filter((style) => selectedIds.includes(style._id))
    .map((style) => style.style);

  const [quizResultData, setQuizResult] = useState({
    resultFinal: null,
  });
  const [loading, setLoading] = useState(true);
  const handleSubmit = async () => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_SERVER}/gallery/result`;
      const response = await axios.post(endpoint, { selectedNames });
      console.log("Server response:", response.data, response.data.resultFinal);
      setTimeout(() => {
        // setQuizResult({ resultFinal: response.data.resultFinal });
        setLoading(false);
      }, 2000);
      setQuizResult({ resultFinal: response.data.resultFinal });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <main className="p-2">
      {quizResultData.resultFinal ? (
        <div>
          {loading && (
            <div className="min-h-screen flex justify-center items-center">
              <p>Calculating your result</p>
              <div className="relative">
                <Image
                  src="/spinner-square.svg"
                  alt="Home Cover"
                  width={200}
                  height={200}
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
          {!loading && <QuizResult result={quizResultData.resultFinal} />}
        </div>
      ) : (
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
            <Masonry columnsCount={3} gutter="3spinnerpx">
              {images?.pages?.map((page) =>
                page.map(
                  (
                    style: {
                      _id: any;
                      url: string;
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
            <div className="bg-gray-100 bg-opacity-75 fixed bottom-0 lg:w-1/2 sm:w-full xs:w-full text-center p-4 ">
              <button
                className="mt-auto btn-yellow"
                style={{ backgroundColor: "" }}
                onClick={handleSubmit}
              >
                Submits
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

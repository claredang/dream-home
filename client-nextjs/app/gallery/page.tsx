"use client";
import StyleGallery from "./StyleGallery";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import QuizResult from "../quiz-test/QuizResult";

async function getStyleGallery({ pageParam }: { pageParam: number }) {
  //   const res = await fetch(
  //     `https://pokeapi.co/api/v2/ability?limit=20&offset=${pageParam}`
  //   );
  const res = await fetch(
    `http://localhost:8080/api/style?limit=20&offset=${pageParam}`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  //   console.log("data: ", data);
  let filtered = await data.results.map((style: {}, index: number) => {
    // console.log("style: ", style);
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
  console.log("filter: ", filtered);
  return filtered;
}

export default function Home() {
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

  const startQuiz = async () => {
    console.log("inside here");
    // const url = "https://interior-design.p.rapidapi.com/explore?limit=5";
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": "aefa0b0514msh3640bed410ad6ecp1e490bjsneeb4c9d8be70",
    //     "X-RapidAPI-Host": "interior-design.p.rapidapi.com",
    //   },
    // };
    // const response = await fetch(url, options);
    // const result = await response.json();

    const response = await fetch(
      `http://localhost:8080/explore?limit=5&offset=2`
    );
    const data = await response.json();
    console.log(data);
  };

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

  console.log("selected name: ", selectedNames);
  const [quizResultData, setQuizResult] = useState({
    resultfinal: null,
  });
  const handleSubmit = async () => {
    try {
      // Your server endpoint where you want to send the data
      const endpoint = "http://localhost:8080/gallery/result";

      // Assuming your server expects a POST request with a JSON payload
      const response = await axios.post(endpoint, { selectedNames });

      // Handle the server response as needed
      console.log("Server response:", response.data, response.data.resultfinal);
      setQuizResult({ resultfinal: response.data.resultfinal });
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {quizResultData.resultfinal ? (
        // Display Quiz Result if not null
        <div>
          <QuizResult result={quizResultData.resultfinal} />
        </div>
      ) : (
        // Display the default content if Quiz Result is null
        <div className="w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4">
          <div>
            {/* <p>Selected Names: {selectedIds?.join(", ")}</p> */}
            <button onClick={handleSubmit}>Submit</button>
          </div>

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
                      onClick={handleImageClick}
                    />
                  );
                }
              }
            )
          )}
        </div>
      )}
      {/* <div className="w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4">
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {pokemons?.pages?.map((page) =>
          page.map(
            (
              style: {
                imageUrl: string;
                name: string;
              },
              index: number
            ) => {
              if (page.length == index + 1) {
                return (
                  <StyleGallery
                    _id={style._id}
                    image={style.url}
                    name={style.style}
                    key={index}
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
                    onClick={handleImageClick}
                  />
                );
              }
            }
          )
        )}
      </div> */}
    </main>
  );
}

"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { fetchExploreImage } from "../action";

let page = 2;

export type HomestayCard = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();

  const [data, setData] = useState<HomestayCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500; // 500 milliseconds

      const timeoutId = setTimeout(() => {
        fetchExploreImage(page).then((res) => {
          setData([...data, ...res]);
          page++;
        });

        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && isLoading && (
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;

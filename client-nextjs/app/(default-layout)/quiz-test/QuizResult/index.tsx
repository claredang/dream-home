"use client";
import QuizResultCard from "./QuizResultCard";
import PinterestLayout from "@/app/_components/PinterestLayout";
import Modal from "@/app/_components/LoginModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";

interface ResultItem {
  [key: string]: string;
}

interface QuizResultProps {
  result: ResultItem[];
}

interface FetchedDataItem {
  // Define the structure of the fetched data
  // Adjust the types based on the actual structure of your fetched data
  key: string;
  value: string;
}

export default function QuizResult({ result }: QuizResultProps) {
  const styles = result.map((item) => Object.keys(item)[0]);

  const [fetchedData, setFetchedData] = useState<string[]>([]);

  const getStyleImage = async (styles: string[]) => {
    const fetchedDataArray: string[] = [];
    for (const style of styles) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/style/${style}`, // Individual style route
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            style: style,
          }),
        }
      );
      const data = await response.json();
      fetchedDataArray.push(data);
    }
    setFetchedData(fetchedDataArray);
  };

  useEffect(() => {
    // Call getStyleImage when the component mounts
    getStyleImage(styles);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row lg:py-10 lg:px-12">
      <div className="lg:w-1/2 xs:w-full flex-col items-center justify-between p-6 ml-5">
        <p className="bold-32 p-3 lg:mb-20 mb-15 text-blue-100">
          Based on our prediction, here is your style ✨
        </p>
        <div className="flex flex-wrap gap-3 lg:mb-20">
          {result.map((item, index) => (
            <div key={index} className="gap-2 mb-4 rounded-lg bg-slate-100">
              <QuizResultCard cardInfo={item} />
            </div>
          ))}
        
        </div>
        <button className="btn-yellow mr-5">
          <Link href="/quiz-test">Do Quiz Again</Link>
        </button>
        <button className="btn-yellow">
          <Link href="/design-idea">Explore Style</Link>
        </button>
      </div>

      <div className="w-full sm:w-1/2">
        <PinterestLayout images={fetchedData} isLoop={true} />
      </div>
    </div>
    

  );
}

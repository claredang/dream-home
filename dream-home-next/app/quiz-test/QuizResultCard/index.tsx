import React from "react";
import { capitalizeFirstLetter } from "../../_utilities/sharedFunction";
import text from "./content";
// import Emoji from "../../shared/emoji";
import Link from "next/link";

export default function QuizResultCard({ cardInfo }) {
  console.log("card info", cardInfo);
  const styleKey = Object.keys(cardInfo)[0]; // Extract the key dynamically
  return (
    <div className="bg-red-100 ">
      <div className="flex flex-col p-2 flex-wrap rounded-md shadow-md ring-1 ring-slate-900/5 flex-grow">
        <div className="flex justify-between">
          <p className="font-bold p-2">
            {/* {capitalizeFirstLetter(cardInfo.mostPreferredStyle)}{" "} */}
            {styleKey}
          </p>
          <div>✨</div>
        </div>
        <div className="p-2">{cardInfo[styleKey]}</div>
      </div>
    </div>
  );
}

import React from "react";
import { capitalizeFirstLetter } from "../../_utilities/sharedFunction";
import text from "./content";
// import Emoji from "../../shared/emoji";
import Link from "next/link";

export default function QuizResultCard({ cardInfo }) {
  // const router = useRouter();
  return (
    <div className="certificate-card">
      <div className="certificate-detail-div">
        <h5 className="card-title">
          <span>
            {capitalizeFirstLetter(cardInfo.mostPreferredStyle)}{" "}
            {/* <Emoji symbol="✨" label="sparkles" /> */}
          </span>
        </h5>
        <p className="card-subtitle">{cardInfo.resultDescription}</p>
      </div>
      <div>
        {/* <button onClick={openUrlInNewTab(url)}>Explore more</button> */}
        <button>
          <Link href="/explore"> {text.quiz.explore_more}</Link>
        </button>

        <button type="button" onClick={() => router}>
          Click me
        </button>
        <Link href="/quiz-test">Quiz test</Link>
      </div>
    </div>
  );
}

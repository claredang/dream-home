import QuizResultCard from "./QuizResultCard";
import PinterestLayout from "@/app/_components/PinterestLayout";
import Link from "next/link";

interface ResultItem {
  [key: string]: string;
}

interface QuizResultProps {
  result: ResultItem[];
}

export default function QuizResult({ result }: QuizResultProps) {
  const styles = result.map((item) => Object.keys(item)[0]);

  const getStyleImage = async (styles: string[]) => {
    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER}/quiz/answer`,
      `http://localhost:8080/style`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          style: styles,
        }),
      }
    );
    const data = await response.json();
    console.log("data: ", data);
  };

  return (
    <div className="flex flex-col sm:flex-row lg:py-10 lg:px-12">
      <div className="lg:w-1/2 xs:w-full flex-col items-center justify-between p-6 ml-5">
        <p className="bold-32 p-3 lg:mb-20 mb-15 coastal">
          Based on our super fancy algorithm™, here is your style ✨
        </p>
        <div className="flex flex-wrap gap-3 lg:mb-20">
          {result.map((item, index) => (
            <div key={index} className="gap-2 mb-4 rounded-lg bg-slate-100">
              <QuizResultCard cardInfo={item} />
              <button onClick={() => getStyleImage(styles)}>test</button>
            </div>
          ))}
        </div>
        {/* <button className="font-bold p-2 m-3 text-white rounded-2xl gradient-button"> */}
        <Link href="/quiz-test">Do Quiz Again!</Link>
        <Link href="/quiz-test/quiz-card">quiz card</Link>
        {/* </button> */}
        <button className="font-bold p-2 m-3 text-white rounded-2xl gradient-button">
          Explore
        </button>
      </div>

      <div className="w-full sm:w-1/2 md:w-2/3">
        <PinterestLayout images={styles} isLoop={true} />
      </div>
    </div>
  );
}

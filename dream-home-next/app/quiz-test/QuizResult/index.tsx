import QuizResultCard from "./QuizResultCard";
import PinterestLayout from "@/components/PinterestLayout";

interface ResultItem {
  [key: string]: string;
}

interface QuizResultProps {
  result: ResultItem[];
}

export default function QuizResult({ result }: QuizResultProps) {
  const styles = result.map((item) => Object.keys(item)[0]);

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
            </div>
          ))}
        </div>
        <button className="font-bold p-2 m-3 text-white rounded-2xl gradient-button">
          Do Quiz Again
        </button>
        <button className="font-bold p-2 m-3 text-white rounded-2xl gradient-button">
          Explore
        </button>
      </div>

      <div className="w-full sm:w-1/2">
        <PinterestLayout images={styles} isLoop={true} />
      </div>
    </div>
  );
}

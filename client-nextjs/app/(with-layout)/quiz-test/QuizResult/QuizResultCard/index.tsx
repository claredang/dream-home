import { capitalizeFirstLetter } from "../../../../_utilities/sharedFunction";

interface QuizResultCardProps {
  cardInfo: {
    [key: string]: string;
  };
}

export default function QuizResultCard({ cardInfo }: QuizResultCardProps) {
  const styleKey = Object.keys(cardInfo)[0];
  return (
    <div className="max-w-[300px] p-3 ">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="bold-18 text-black">
            {capitalizeFirstLetter(styleKey)}
          </p>
          <div>✨</div>
        </div>
        <div className="p-2 text-gray-50">{cardInfo[styleKey]}</div>
      </div>
    </div>
  );
}

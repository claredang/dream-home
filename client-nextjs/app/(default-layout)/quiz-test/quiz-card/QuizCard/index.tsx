import Image from "next/image";

interface Option {
  type: string;
  image: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

interface QuizCardProps {
  question: Question | null;
  onSelectAnswer: (id: number, answerType: string) => void;
}

const QuizCard = ({ question, onSelectAnswer }: QuizCardProps) => {
  if (!question) {
    return null;
  }
  const { id, question: questionText, options } = question;

  const handleSelectAnswer = (answerType: string) => {
    onSelectAnswer(id, answerType);
  };

  return (
    <div className="sm:p-16 py-16 px-8 flex flex-col gap-10 lg:w-3/4 lg:mx-auto">
      <h2 className="bold-20 lg:bold-30">{questionText}</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-5">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectAnswer(option.type)}
            className="flex flex-col"
          >
            <div className="relative w-full h-[30vh]">
              <Image src={option.image} alt="hey" fill className="rounded-xl" />
            </div>
            <p className="pt-2"> {option.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;

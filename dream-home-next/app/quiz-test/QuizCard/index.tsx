import Image from "next/image";

const QuizCard = ({ question, onSelectAnswer }) => {
  if (!question) {
    return null; // Return early if question is null
  }
  const { id, question: questionText, options } = question;

  console.log("options: ", options);

  const handleSelectAnswer = (answerType) => {
    console.log("answer: ", answerType);
    onSelectAnswer(id, answerType);
  };

  return (
    <div className="sm:p-16 py-16 px-8 flex flex-col gap-10 lg:w-3/4 lg:mx-auto">
      <h2 className="bold-20 lg:bold-30">{questionText}</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-5">
        {options.map((option, index) => (
          <button
            key={index} // Add a key prop to the button
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

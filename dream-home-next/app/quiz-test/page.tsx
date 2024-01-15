// components/Quiz.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import { fetchQuizTest } from "../action";
import { capitalizeFirstLetter } from "../_utilities/sharedFunction";
import Button from "@/components/Button";
import QuizResultCard from "./QuizResultCard";
import { useRouter } from "next/router";

const Quiz = ({ question, onSelectAnswer }) => {
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

// components/Result.js
const Result = ({ result }) => {
  return (
    <div className="sm:p-16 py-16 px-9 flex flex-wrap justify-center gap-10">
      <div className="max-w-md p-3 ">
        <QuizResultCard cardInfo={result} />
      </div>

      <div className="max-w-[700px] rounded relative w-full ">
        <div className="flex flex-wrap gap-3 lg:justify-end sm:justify-center">
          <div className="w-1/2 relative h-[37vh]">
            <Image
              src="https://storage.googleapis.com/dream-home-org/coastal_1.jpg"
              alt="Image 1"
              fill
              className="rounded-sm w-full h-full"
            />
          </div>
          <div className="w-1/3 relative h-[37vh]">
            <Image
              src="https://storage.googleapis.com/dream-home-org/coastal_2.jpg"
              alt="Image 2"
              fill
              className="rounded-sm w-full h-full"
            />
          </div>
          <div className="w-1/3 relative h-[37vh]">
            <Image
              src="https://storage.googleapis.com/dream-home-org/coastal_2.jpg"
              alt="Image 2"
              fill
              className="rounded-sm w-full h-full"
            />
          </div>
          <div className="w-1/2 relative h-[37vh]">
            <Image
              src="https://storage.googleapis.com/dream-home-org/coastal_2.jpg"
              alt="Image 2"
              fill
              className="rounded-sm w-full h-full"
            />
          </div>
          <div className="w-5/6 relative h-[37vh]">
            <Image
              src="https://storage.googleapis.com/dream-home-org/coastal_2.jpg"
              alt="Image 2"
              fill
              className="rounded-sm w-full h-full"
            />
          </div>
          {/* Add more image divs as needed */}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // const data = await fetchQuizTest();
  const [quizData, setQuizData] = useState({
    sessionId: null,
    question: null,
    result: null,
  });
  const startQuiz = async () => {
    console.log("inside here");
    const response = await fetch("http://localhost:8080/quiz/start", {
      method: "POST",
    });
    const data = await response.json();
    setQuizData({
      sessionId: data.sessionId,
      question: data.question,
      result: null,
    });
  };

  useEffect(() => {
    // This will run every time quizData is updated
    console.log("Quiz Data:", quizData);
  }, [quizData]);

  const selectAnswer = async (questionId, answerType) => {
    console.log("data.result: ", quizData.sessionId, answerType);
    const response = await fetch("http://localhost:8080/quiz/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: quizData.sessionId,
        answer: answerType,
      }),
    });
    const data = await response.json();
    setQuizData({ ...quizData, question: data.question, result: data.result });
  };

  return (
    <div>
      <div>
        {quizData.result ? (
          <Result result={quizData.result} />
        ) : (
          <Quiz question={quizData.question} onSelectAnswer={selectAnswer} />
        )}
      </div>
      {!quizData.sessionId && (
        <div>
          <div className="flexCenter max-container relative w-full">
            <Image
              // src="/boat.png"
              src="/home-cover-1.jpg"
              alt="boat"
              width={1440}
              height={580}
              className="w-full object-cover object-center 2xl:rounded-5xl"
            />

            <div className="flex absolute flex-col bg-white py-8 pl-5 pr-7 gap-5 rounded-3xl border shadow-md items-center">
              <p className="flex-wrap bold-40 lg:bold-60 lg:max-w-[400px] text-center">
                Find your interior design style
              </p>
              <p>
                Take our interior design style quiz to discover your unique home
                style.
              </p>
              <Button
                type="button"
                title="Start Quiz"
                variant="btn_black"
                onClick={startQuiz}
                full={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// export default Home;

"use client";
// export default QuizCard;
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

// export default QuizCard;

import { useState, useEffect } from "react";
// import Image from "next/image";
import Button from "@/app/_components/Button";
// import QuizCard from "./QuizCard";
// import QuizCard from "./quiz-card/page";
import QuizResult from "../QuizResult";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default function QuizTest() {
  const [quizData, setQuizData] = useState({
    sessionId: null,
    question: null,
    result: null,
  });

  const startQuiz = async () => {
    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER}/quiz/start`,
      `http://localhost:8080/quiz/start`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    setQuizData({
      sessionId: data.sessionId,
      question: data.question,
      result: null,
    });
  };

  useEffect(() => {
    // Call getStyleImage when the component mounts
    startQuiz();
  }, []);

  const selectAnswer = async (questionId: any, answerType: string) => {
    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_SERVER}/quiz/answer`,
      `http://localhost:8080/quiz/answer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: quizData.sessionId,
          answer: answerType,
        }),
      }
    );
    console.log("answer type: ", answerType);
    const data = await response.json();
    setQuizData({ ...quizData, question: data.question, result: data.result });
  };

  return (
    <div>
      <div>
        {quizData.result ? (
          <QuizResult result={quizData.result} />
        ) : (
          <QuizCard
            question={quizData.question}
            onSelectAnswer={selectAnswer}
          />
        )}
      </div>
      {/* {!quizData.sessionId && (
        <div>
          <div className="flexCenter lg:max-container relative w-full lg:pb-12 pb-5">
            <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
              <Image
                src="/home-cover-1.jpg"
                alt="Home Cover"
                width={1440}
                height={580}
                className="h-full w-full min-w-[1100px] bg-home-cover-1 bg-cover bg-no-repeat"
              />
            </div>
            <div className="flex absolute flex-col bg-white lg:py-8 py-5 pl-5 pr-7 gap-5 rounded-3xl border shadow-md items-center text-center ">
              <p className="flex-wrap xs:bold-20 md:bold-32 lg:bold-60 lg:max-w-[400px]">
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
              <Link href="/quiz-test/quiz-card">quiz card</Link>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

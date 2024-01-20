"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/Button";
import QuizCard from "./QuizCard";
import QuizResult from "./QuizResult";

export default function QuizTest() {
  const [quizData, setQuizData] = useState({
    sessionId: null,
    question: null,
    result: null,
  });

  const startQuiz = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/quiz/start`,
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

  const selectAnswer = async (questionId: any, answerType: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/quiz/answer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: quizData.sessionId,
          answer: answerType,
        }),
      }
    );
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
      {!quizData.sessionId && (
        <div>
          <div className="flexCenter lg:max-container relative w-full lg:pb-12">
            <div className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
              <Image
                src="/home-cover-1.jpg"
                alt="Home Cover"
                width={1440}
                height={580}
                className="h-full w-full min-w-[1100px] bg-home-cover-1 bg-cover bg-no-repeat"
              />
            </div>
            <div className="flex absolute flex-col bg-white lg:py-8 py-5 pl-5 pr-7 gap-5 rounded-3xl border shadow-md items-center ">
              <p className="flex-wrap xs:bold-20 md:bold-32 lg:bold-60 lg:max-w-[400px] text-center">
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

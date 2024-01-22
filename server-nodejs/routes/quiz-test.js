const express = require("express");

const quizRoutes = express.Router();

const dbo = require("../db/quiz-test");

const sessions = {};
let questionsData = "";

// Call the async function
async function getQuizQuestion() {
  const cursor = dbo.getQuizTestDb();
  questionsData = await cursor;
}
getQuizQuestion();

// GET: ALL
quizRoutes.route("/quiz-test").get(async function (req, res) {
  const cursor = dbo.getQuizTestDb();
  var results = await cursor;
  res.json(results).status(200);
});

// POST: add quiz test
quizRoutes.route("/quiz/start").post((req, res) => {
  const sessionId = generateSessionId();
  const firstQuestion = getNextQuestion(sessionId);
  res.json({ sessionId, question: firstQuestion });
});

// POST: user answer
quizRoutes.route("/quiz/answer").post((req, res) => {
  const { sessionId, answer } = req.body;
  storeUserAnswer(sessionId, answer);

  const nextQuestion = getNextQuestion(sessionId);
  if (nextQuestion) {
    res.json({ question: nextQuestion });
  } else {
    const result = calculateResult(sessionId);
    res.json({ result });
  }
});

quizRoutes.route("/quiz/result/:sessionId").post((req, res) => {
  const sessionId = req.params.sessionId;
  const result = calculateResult(sessionId);
  res.json({ result });
});

// HELPER FUNCTION:
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

function getNextQuestion(sessionId) {
  const session = sessions[sessionId] || initializeSession(sessionId);
  const { currentQuestionIndex } = session;

  if (currentQuestionIndex < questionsData.length) {
    const nextQuestion = questionsData[currentQuestionIndex];
    return {
      id: nextQuestion.id,
      question: nextQuestion.question,
      options: nextQuestion.options.map((option) => ({
        text: option.text,
        image: option.image,
        type: option.type,
      })),
    };
  }

  return null;
}
function storeUserAnswer(sessionId, answer) {
  const session = sessions[sessionId] || initializeSession(sessionId);
  const { currentQuestionIndex, userAnswers } = session;
  const currentQuestion = questionsData[currentQuestionIndex];

  userAnswers[currentQuestion._id] = answer;

  session.currentQuestionIndex += 1;
}

function calculateResult(sessionId) {
  const session = sessions[sessionId];
  const { userAnswers } = session;
  const styleCount = {};

  for (const questionId in userAnswers) {
    const answerType = userAnswers[questionId];
    if (answerType in styleCount) {
      styleCount[answerType] += 1;
    } else {
      styleCount[answerType] = 1;
    }
  }

  const maxCount = Math.max(...Object.values(styleCount));

  const mostPreferredStyles = Object.keys(styleCount).filter(
    (style) => styleCount[style] === maxCount
  );

  const styleDescriptions = dbo.getStyleDescription();
  const resultDescriptions = mostPreferredStyles.map(
    (style) => styleDescriptions[style]
  );

  const result = mostPreferredStyles.map((style, index) => ({
    [style]: resultDescriptions[index],
  }));
  console.log("Combined Result:", result);
  return result;
}

function initializeSession(sessionId) {
  const session = {
    currentQuestionIndex: 0,
    userAnswers: {},
  };
  sessions[sessionId] = session;
  return session;
}

module.exports = quizRoutes;

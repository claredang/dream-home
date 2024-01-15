const express = require("express");

// The router is a middleware
const recordRoutes = express.Router();

// Connect to the database
const dbo = require("../db/conn");

const dbQuiz = require("../db/quiz-test");

const sessions = {};

let questionsData = "";

async function someFunction() {
  const cursor = dbQuiz.getQuizTestDb();
  questionsData = await cursor;
}

// Call the async function
someFunction();

const styleDescriptions = {
  "farm-house":
    "The utilitarian beauty of raw materials and industrial aesthetics",
  glam: "You love the glitz and glamour. Your space is filled with luxurious fabrics, metallic accents, and bold statements.",
  industrial:
    "Raw and edgy defines your style. Exposed bricks, metal finishes, and a utilitarian vibe dominate your space.",
  "midcentury-modern":
    "You're all about the retro charm. Clean lines, organic shapes, and a mix of materials give your space a timeless appeal.",
  coastal:
    "Peace, love, and patterns. Your love of vibrant colors, layered textures, and ornate embellishments create a whimsical lair with let-down-your-hair flair.",
  scandinavian:
    "Simplicity is your secret to a classic life. You love clean lines, plush fabrics, and handcrafted things. You get really excited about functional storage solutions and cozy pants on Sundays.",
};

// GET: ALL
recordRoutes.route("/explore").get(async function (req, res) {
  const cursor = dbo.getDb();
  var results = await cursor;
  res.json(results).status(200);
});
// GET: ALL
recordRoutes.route("/quiz-test").get(async function (req, res) {
  const cursor = dbQuiz.getQuizTestDb();
  var results = await cursor;
  res.json(results).status(200);
});
// GET: Query
recordRoutes.route("/api/query").post(async function (req, res) {
  const { location } = req.body;
  console.log("inside here", location);
  const cursor = dbo.queryDb(location);
  var results = await cursor;
  res.json(results).status(200);
});

// POST: Create one
recordRoutes.route("/explore/new").post(async function (req, res) {
  const result = dbo.queryDb(req);
  if (result) res.send("Not found").status(404);
  res.send(result).status(204);
});

// POST: Add col
recordRoutes.route("/explore/add-col").post((req, res) => {
  const _db = dbo.addCol();
  res.send(_db).status(200);
});

// POST: Del col
recordRoutes.route("/explore/del-col").post((req, res) => {
  const _db = dbo.delCol();
  res.send(_db).status(200);
});

// POST: add quiz test
recordRoutes.route("/quiz/start").post((req, res) => {
  const sessionId = generateSessionId();
  const firstQuestion = getNextQuestion(sessionId);
  res.json({ sessionId, question: firstQuestion });
});

// POST: user answer
recordRoutes.route("/quiz/answer").post((req, res) => {
  console.log("1. ANSWER: ", req.body);
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

recordRoutes.route("/quiz/result/:sessionId").post((req, res) => {
  const sessionId = req.params.sessionId;
  const result = calculateResult(sessionId);
  res.json({ result });
});

// DELETE: Delete ALL
recordRoutes.route("/explore/delete").delete((req, res) => {
  const _db = dbo.deleteDb();
  res.send(_db).status(200);
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

  return null; // No more questions
}
function storeUserAnswer(sessionId, answer) {
  const session = sessions[sessionId] || initializeSession(sessionId);
  console.log("2. Stored: ", sessionId, answer, session);
  const { currentQuestionIndex, userAnswers } = session;
  const currentQuestion = questionsData[currentQuestionIndex];

  userAnswers[currentQuestion._id] = answer;
  console.log(
    "3. answer updated: ",
    userAnswers,
    "session",
    session,
    "current id",
    currentQuestion._id
  );

  session.currentQuestionIndex += 1;
}

function calculateResult(sessionId) {
  const session = sessions[sessionId];
  const { userAnswers } = session;
  console.log("all prefer styles: ", userAnswers, sessionId);
  const styleCount = {};

  for (const questionId in userAnswers) {
    const answerType = userAnswers[questionId];
    if (answerType in styleCount) {
      styleCount[answerType] += 1;
    } else {
      styleCount[answerType] = 1;
    }
  }

  // Find the maximum count
  const maxCount = Math.max(...Object.values(styleCount));

  // Find all styles with the maximum count
  const mostPreferredStyles = Object.keys(styleCount).filter(
    (style) => styleCount[style] === maxCount
  );

  console.log("all prefer styles: ", mostPreferredStyles);

  // You can return an array of mostPreferredStyles along with their descriptions
  const resultDescriptions = mostPreferredStyles.map(
    (style) => styleDescriptions[style]
  );

  const combinedResult = mostPreferredStyles.map((style, index) => ({
    [style]: resultDescriptions[index],
  }));
  console.log("Combined Result:", combinedResult);
  return combinedResult;
  return combinedArray;
  // return {
  //   // mostPreferredStyles,
  //   // resultDescriptions,
  //   combinedResult,
  // };
}

function initializeSession(sessionId) {
  const session = {
    currentQuestionIndex: 0,
    userAnswers: {},
  };
  sessions[sessionId] = session;
  return session;
}

function replaceDashesWithUnderscores(inputString) {
  return inputString.replace(/-/g, "_");
}

module.exports = recordRoutes;

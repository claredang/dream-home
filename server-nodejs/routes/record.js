const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");
const e = require("express");

// GET: ALL
recordRoutes.route("/explore").get(async function (req, res) {
  console.log("Inside GET Explore");
  const cursor = dbo.getDb();
  var results = await cursor;

  const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
  const offset = parseInt(req.query.offset) || 0;

  const paginatedBooks = results.slice(offset, offset + limit);
  res.json(paginatedBooks).status(200);
});

// GET: Query
recordRoutes.route("/api/query").post(async function (req, res) {
  const { location } = req.body;
  console.log("inside here", location);
  const cursor = dbo.queryDb(location);
  var results = await cursor;
  res.json(results).status(200);
});

// GET: Query
recordRoutes.route("/api/style").get(async function (req, res) {
  const cursor = dbo.getStyle();
  var data = await cursor;
  const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
  const offset = parseInt(req.query.offset) || 0;

  const startIndex = offset;
  const endIndex = startIndex + limit;

  const results = data.slice(startIndex, endIndex);

  const response = {
    count: data.length,
    next:
      endIndex < data.length
        ? `/api/style?offset=${endIndex}&limit=${limit}`
        : null,
    previous:
      startIndex > 0
        ? `/api/style?offset=${Math.max(0, startIndex - limit)}&limit=${limit}`
        : null,
    results: results,
  };

  res.json(response);
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

// POST: Add multiple entries
recordRoutes.route("/explore/insert-many").post((req, res) => {
  const _db = dbo.postDb();
  res.send(_db).status(200);
});

// POST: Del col
recordRoutes.route("/explore/del-col").post((req, res) => {
  const _db = dbo.delCol();
  res.send(_db).status(200);
});

// DELETE: Delete ALL
recordRoutes.route("/explore/delete").delete((req, res) => {
  const _db = dbo.deleteDb();
  res.send(_db).status(200);
});

// GET Chatbot
recordRoutes.route("/chatbot").get(async function (req, res) {
  const CHATBOT_KEY = process.env.OPENAI_KEY.toString();
  res.send({ chatbot: CHATBOT_KEY }).status(200);
});

//
recordRoutes.route("/style/:style").post(async function (req, res) {
  const style = req.params.style;
  const _db = await dbo.getIndividualStyle(style);
  const url = _db.map((item) => item.url);
  res.json(url).status(200);
});

recordRoutes.route("/api/generate-image").post(async function (req, res, next) {
  console.log("Inside api image generator");
  const prompt = req.body.fullPrompt;
  const GETIMG_API_KEY = process.env.GETIMG_API_KEY;
  const url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${GETIMG_API_KEY}`,
    },
    body: JSON.stringify({
      model: "stable-diffusion-xl-v1-0",
      prompt: prompt,
      negative_prompt: "Disfigured, cartoon, blurry",
      prompt_2: prompt,
      negative_prompt_2: "Disfigured, cartoon, blurry",
      width: 768,
      height: 768,
      steps: 30,
      guidance: 7.5,
      seed: 0,
      scheduler: "euler",
      output_format: "jpeg",
      response_format: "b64",
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json({ image: data.image });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate image" });
  }
});

module.exports = recordRoutes;

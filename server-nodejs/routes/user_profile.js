const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/user");

// POST
recordRoutes.route("/design-inspiration-user").post(async function (req, res) {
  const { email } = req.body;
  const cursor = dbo.getUserImageSave(email);
  var results = await cursor;
  res.json(results).status(200);
});

// POST

recordRoutes.route("/design-inspiration").post(async function (req, res) {
  const { email, image_id, collection } = req.body;
  console.log("add to board route:", email, image_id, collection);
  const cursor = dbo.saveToBoard(email, image_id, collection);
  var results = await cursor;
  res.json(results).status(200);
});

recordRoutes.route("/design-inspiration").delete(async function (req, res) {
  const { email, image_id } = req.body;
  console.log("delete individual image from board", email, image_id);
  const cursor = dbo.unsaveFromBoard(email, image_id);
  var results = await cursor;
  res.json(results).status(200);
});

recordRoutes.route("/design-board").delete(async function (req, res) {
  const { email, board } = req.body;
  console.log("delete board", email, board);
  const cursor = dbo.deleteBoard(email, board);
  var results = await cursor;
  res.json(results).status(200);
});

recordRoutes.route("/design-board-images").post(async function (req, res) {
  const { email, board_name } = req.query;
  console.log("add to board route test:", email, board_name);
  const cursor = dbo.getImagesFromUserBoard(email, board_name);
  var results = await cursor;
  res.json(results).status(200);
});

recordRoutes.route("/api/generate-image").post(async function (req, res) {
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

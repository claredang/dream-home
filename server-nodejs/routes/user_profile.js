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
  console.log("delete from board route", email, image_id);
  const cursor = dbo.unsaveFromBoard(email, image_id);
  var results = await cursor;
  res.json(results).status(200);
});

module.exports = recordRoutes;

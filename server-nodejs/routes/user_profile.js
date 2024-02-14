const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/user");

// POST
recordRoutes.route("/design-inspiration").get(async function (req, res) {
  const cursor = dbo.getUserImageSave();
  const cursor2 = dbo.getImage();
  var results = await cursor2;
  res.json(results).status(200);
});

// POST
recordRoutes.route("/design-inspiration").post(async function (req, res) {
  const cursor = dbo.addUserSave();
  var results = await cursor;
  res.json(results).status(200);
});

module.exports = recordRoutes;

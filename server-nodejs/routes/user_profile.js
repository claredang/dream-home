const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/user");

// POST
recordRoutes.route("/design-inspiration-user").post(async function (req, res) {
  const { email } = req.body;
  console.log("email: ", email);
  const cursor = dbo.getUserImageSave(email);
  //   const cursor2 = dbo.getImage();
  var results = await cursor;
  res.json(results).status(200);
});

// POST

recordRoutes.route("/design-inspiration").post(async function (req, res) {
  const { email, image_id } = req.body;
  console.log("req:", email, image_id);
  const cursor = dbo.addUserSave(email, image_id);
  var results = await cursor;
  console.log("inside here");
  res.json(results).status(200);
});

module.exports = recordRoutes;

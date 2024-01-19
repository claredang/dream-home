const express = require("express");

// The router is a middleware
const recordRoutes = express.Router();

// Connect to the database
const dbo = require("../db/quiz-test");

// GET: ALL
recordRoutes.route("/quiz-test").get(async function (req, res) {
  const cursor = dbo.getQuizTestDb();
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

// DELETE: Delete ALL
recordRoutes.route("/explore/delete").delete((req, res) => {
  const _db = dbo.deleteDb();
  res.send(_db).status(200);
});

module.exports = recordRoutes;

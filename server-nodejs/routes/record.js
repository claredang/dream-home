const express = require("express");

// The router is a middleware
const recordRoutes = express.Router();

// Connect to the database
const dbo = require("../db/conn");

// GET: ALL
recordRoutes.route("/explore").get(async function (req, res) {
  const cursor = dbo.getDb();
  var results = await cursor;
  res.json(results).status(200);
});

// POST: Create one
recordRoutes.route("/explore/new").post(async function (req, res) {
  const _db = dbo.createNewEntry(req);
  console.log("body: ", req.body);
  res.send(_db).status(204);
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

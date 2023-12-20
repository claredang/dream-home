const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
recordRoutes.route("/explore").get(async function (req, res) {
  const cursor = dbo.getDb(); // call getDb function from the imported module
  var results = await cursor;
  res.json(results).status(200);
});

recordRoutes.route("/airbnb").get(async function (req, res) {
  const cursor = dbo.getAirbnbDb(); // call getDb function from the imported module
  // You might want to convert the cursor results to an array or handle it as needed
  var results = await cursor;
  res.json(results).status(200);
});

// This section will help you create a new record.
recordRoutes.route("/explore/new").post(function (req, res) {
  // Insert swipe informations
  const _db = dbo.postDb();
  res.send(_db).status(204);
});

// This section will help you delete a record
recordRoutes.route("/explore/delete").delete((req, res) => {
  // Delete documents
  const _db = dbo.deleteDb();
  res.send(_db).status(200);
});

module.exports = recordRoutes;

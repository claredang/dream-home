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
  // You might want to convert the cursor results to an array or handle it as needed
  var results = await cursor.toArray();
  results = results[0]["description"];
  console.log("type of results: ", results[0]["description"]);
  //   res.send(results).status(200);
  res.json(results).status(200);
  //   res.send(results).status(200);
});

// This section will help you create a new record.
recordRoutes.route("/listings/recordSwipe").post(function (req, res) {
  // Insert swipe informations
});

// This section will help you update a record by id.
recordRoutes.route("/listings/updateLike").post(function (req, res) {
  // Update likes
});

// This section will help you delete a record
recordRoutes.route("/listings/delete").delete((req, res) => {
  // Delete documents
});

module.exports = recordRoutes;

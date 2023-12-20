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
// recordRoutes.route("/explore/new").post(async function (req, res) {
//   // Insert swipe informations
//   const _db = dbo.postDb();
//   res.send(_db).status(204);
// });

recordRoutes.route("/explore/new").post(async function (req, res) {
  // Insert swipe informations
  const _db = dbo.createNewEntry(req);
  console.log("body: ", req.body);
  res.send(_db).status(204);
});

// // Add a new document to the collection
// router.post("/", async (req, res) => {
//     let collection = await db.collection("posts");
//     let newDocument = req.body;
//     newDocument.date = new Date();
//     let result = await collection.insertOne(newDocument);
//     res.send(result).status(204);
//   });

// This section will help you delete a record
recordRoutes.route("/explore/delete").delete((req, res) => {
  // Delete documents
  const _db = dbo.deleteDb();
  res.send(_db).status(200);
});

recordRoutes.route("/explore/add-col").post((req, res) => {
  // Delete documents
  const _db = dbo.addCol();
  res.send(_db).status(200);
});

recordRoutes.route("/explore/del-col").post((req, res) => {
  // Delete documents
  const _db = dbo.delCol();
  res.send(_db).status(200);
});

recordRoutes.route("/explore/test").post((req, res) => {
  //   console.log("req: ", req);
  // Delete documents
  //   const _db = dbo.addCol();
  const cursor = dbo.getDb();
  res.json(cursor).status(200);
});

module.exports = recordRoutes;

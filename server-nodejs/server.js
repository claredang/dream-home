const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
console.log(process.env.ATLAS_URI);
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err, db) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

// import express from "express";
// const app = express();
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });
// const port = process.env.PORT || 8000;
// console.log(process.env.ATLAS_URI);

// app.use(cors());
// app.use(express.json());
// import recordRoutes from "./routes/record";
// app.use(recordRoutes);

// // get driver connection
// import dbo from "./db/conn";
// app.listen(port, () => {
//   // perform a database connection when the server starts
//   dbo.connectToServer(function (err, db) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });

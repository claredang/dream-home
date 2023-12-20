const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
// const Storage = require("@google-cloud/storage")
// const format = require
// import { Storage } from "@google-cloud/storage";
// import { format } from "util";
// import Multer from "multer";

const port = process.env.PORT || 8000;
console.log(process.env.ATLAS_URI);
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
//   },
// });

// const cloudStorage = new Storage({
//   keyFilename: `${__dirname}/service_account_key.json`,
//   projectId: "PROJECT_ID",
// });
// // const bucketName = "YOUR_BUCKET_NAME";
// const bucketName = process.env.BUCKET_NAME;
// console.log("bucket_name: ", bucket);
// const bucket = cloudStorage.bucket(bucketName);

// app.post(
//   "/upload-file-to-cloud-storage",
//   multer.single("file"),
//   function (req, res, next) {
//     if (!req.file) {
//       res.status(400).send("No file uploaded.");
//       return;
//     }
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream();
//     blobStream.on("error", (err) => {
//       next(err);
//     });
//     blobStream.on("finish", () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = format(
//         `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//       );
//       res.status(200).json({ publicUrl });
//     });
//     blobStream.end(req.file.buffer);
//     console.log(req.file);
//   }
// );

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err, db) {
    if (err) console.error(err);
  });
  // console.log("bucket_name: ", bucket);
  console.log(`Server is running on port: ${port}`);
});

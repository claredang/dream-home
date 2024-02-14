const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const Multer = require("multer");
const path = require("path");
const keyFilePath = path.join(
  __dirname,
  "rugged-practice-408522-67e564e19b83.json"
);
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(require("./routes/quiz-test"));
app.use(require("./routes/user_profile"));

const dbo = require("./db/conn");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb
  },
});

const cloudStorage = new Storage({
  keyFilename: keyFilePath,
  projectId: process.env.PROJECT_ID,
});

const bucketName = process.env.BUCKET_NAME;
const bucket = cloudStorage.bucket(bucketName);

app.post(
  "/upload-file-to-cloud-storage",
  multer.single("file"),
  function (req, res, next) {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      next(err);
    });
    blobStream.on("finish", () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(200).json({ publicUrl });
    });
    blobStream.end(req.file.buffer);
  }
);

app.get("/get-url", (req, res) => {
  const file = bucket.file("indochine_11.jpg");
  const config = {
    action: "read",
    expires: "03-17-2025",
  };
  file.getSignedUrl(config, (err, url) => {
    res.status(200).json({ url });
  });
});

app.get("/get-files-list", async (req, res) => {
  const options = {
    // prefix: "audio", // or anything
  };
  const [files] = await bucket.getFiles(options);
  res.status(200).json({ files });
});

app.post("/upload", multer.array("file"), async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const uploadPromises = [];
  const image_url = [];

  files.forEach((file) => {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    const uploadPromise = new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        reject(err);
      });

      blobStream.on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve({ filename: file.originalname, publicUrl });
        image_url.push(publicUrl);
      });

      blobStream.end(file.buffer);
    });

    uploadPromises.push(uploadPromise);
  });

  Promise.all(uploadPromises)
    .then((results) => {
      req.body.image_url = image_url;
      const _db = dbo.createNewEntry(req);
      res.send(_db).status(204);
    })
    .catch((error) => {
      console.error("Error uploading files:", error);
    });
});

app.listen(port, () => {
  dbo.connectToServer(function (err, db) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

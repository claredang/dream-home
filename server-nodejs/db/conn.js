const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

// Construct the MongoDB connection string
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  connectToServer: async function (callback) {
    client.connect();
    // Send a ping to confirm a successful connection
    client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  },

  getDb: function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    const cursor = coll.find({}).toArray();
    return cursor;
  },

  getStyle: function () {
    const _db = client.db("homestay");
    const coll = _db.collection("style_gallery");
    const cursor = coll.find({}).toArray();
    return cursor;
  },

  queryDb: async function (req) {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    let query = { location: req };
    const cursor = coll.findOne(query);
    return cursor;
  },

  postDb: function () {
    const _db = client.db("homestay");
    const coll = _db.collection("style_gallery");
    const docs = [
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_1.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_2.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_3.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_4.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_5.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_6.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_7.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_8.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_9.jpg",
        style: "midcentury_modern",
      },
      {
        url: "https://storage.googleapis.com/dream-home-org/midcentury-modern_10.jpg",
        style: "midcentury_modern",
      },
    ];

    const cursor = coll.insertMany(docs);
    return cursor;
  },

  createNewEntry: async function (req) {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    let newDocument = req.body;
    let result = await coll.insertOne(newDocument);
    return result;
  },

  deleteDb: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    let result = await coll.deleteMany({});
    return result;
  },

  addCol: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    let result = await coll.updateMany(
      {},
      {
        $set: {
          image_url: [],
        },
      }
    );
    return result;
  },

  delCol: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    let result = await coll.updateMany({}, { $unset: { image_url: null } });
    return result;
  },
};

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

  getStyle: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("style_gallery");
    const cursor = await coll.find({}).toArray();
    const shuffle = this.shuffleArray(cursor);
    return shuffle;
    // return cursor;
  },

  getIndividualStyle: async function (style) {
    const _db = client.db("homestay");
    const coll = _db.collection("style_gallery");
    const cursor = await coll.find({ style: style }).limit(6).toArray();
    console.log("cusor: ", cursor, typeof cursor);
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

  // Helper function //
  shuffleArray: function (array) {
    // console.log("array: ", array);
    const newArray = array.slice(); // Create a copy to avoid modifying the original array
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
};

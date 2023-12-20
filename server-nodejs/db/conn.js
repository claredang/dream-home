// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://claredang:Ygbigbang2906!@cluster0.ls1wr6a.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//     const db = client.db("sample_airbnb");
//     const coll = db.collection("listingsAndReviews");
//     // find code goes here
//     const cursor = coll.find({ name: "Ribeira Charming Duplex" });
//     console.log(cursor);
//     // iterate code goes here
//     await cursor.forEach(console.log);

// const docs = [
//   {
//     _id: "403055315",
//     date: new Date("2019-01-20T05:00:00.000Z"),
//     listing_id: "10006546",
//     reviewer_id: "15138940",
//     reviewer_name: "Milo",
//     comments:
//       "The house was extremely well located and Ana was able to give us some really great tips...",
//   },
// ];
// const result = await coll.insertMany(docs);
// // display the results of your operation
// console.log(result.insertedIds);

//     const doc = {
//       _id: "403055315",
//     };
//     const result_delete = await coll.deleteMany(doc);
//     // amount deleted code goes here
//     console.log("Number of documents deleted: " + result_delete.deletedCount);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const db = client.db("sample_guides");
// const coll = db.collection("planets");
// const cursor = coll.find();

const { MongoClient, ServerApiVersion } = require("mongodb");
// const Db = process.env.ATLAS_URI;

Db =
  "mongodb+srv://claredang:Ygbigbang2906!@cluster0.ls1wr6a.mongodb.net/?retryWrites=true&w=majority";

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

  getAirbnbDb: function () {
    const _db = client.db("sample_airbnb");
    const coll = _db.collection("listingsAndReviews");
    // find code goes here
    // const cursor = coll.find({ name: "Ribeira Charming Duplex" });
    const cursor = coll.find({}).limit(5).toArray();
    return cursor;
    // return _db;
  },

  getDb: function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    // find code goes here
    // const cursor = coll.find({ name: "Ribeira Charming Duplex" });
    const cursor = coll.find({}).limit(5).toArray();
    return cursor;
    // return _db;
  },

  postDb: function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    const docs = [
      {
        _id: 12,
        title: "test",
        interior_style: "test",
        location: "test",
        rating: "test",
        price: "test",
      },
      // {name: "Wild2", officialName: "81P/Wild", orbitalPeriod: 6.41, radius: 1.5534, mass: 2.3e13},
      // {name: "Comet Hyakutake", officialName: "C/1996 B2", orbitalPeriod: 17000, radius: 0.77671, mass: 8.8e12}
    ];
    const cursor = coll.insertMany(docs);
    return cursor;
  },

  deleteDb: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    const query = { _id: 12 };
    let result = await coll.deleteOne(query);
    return result;
  },
};

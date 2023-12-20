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
    // const cursor = coll.find({}).limit(2).toArray();
    const cursor = coll.find({}).toArray();
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
    const query = { _id: 12 };
    let result = await coll.deleteOne(query);
    return result;
  },

  addCol: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("interiorDesign");
    let result = await coll.updateMany(
      {},
      {
        $set: {
          image_url: [
            "https://ff5a49e2c3601b4b600500d6cc572a4a93e688c59418b2d47d5ebb9-apidata.googleusercontent.com/download/storage/v1/b/dream-home-org/o/2farm-house.jpeg?jk=AanfhSBf2OGGQg1-kiw7FA6OIvv_9Jw_KbWfZn3r_00VMFpbAQghy7UO9515h4OlSMy6dnNOJyjX4NMfOtA5815ByrAiZeTo-6xbfc1iRqBMTT3gS5zS8KFXLQqtnxZtfIoQcueXX-94kUB3nNiLq15KAX8tqw5CXmykEp_E953OmNxML2Y9TZIXcObYJbbPcGWEm7lc8xGRILATuU1fymI-DOQCI-Ousq9FDpogwr7SnyIGhHc_lYZx-fCeyjL90hhzP2QMGig3XXWYawwmYX0rRpISQ0go4Tqke4kcW2_Hfhvdj9m58YznrekbA-g0COochTcXwtcdS078bYGQlmJZuFD7BAWG2SHdHMI4WQl4APLY9p24EVwriqFUV5IbLfWB0JmIuTxXBCPc0NOoebfiwoQ7WLEuoegDwtXCFuH0Vtk_x9mONoK7bV-xEa_0bO_uDpYgJdbp_oW6zY6-dWeYLhv5LLI0BdVM-FuJaYSk_gg9POOaRmDRl_Twyr8fkf4pjqB6VOOxewKRQdbbKnHkfmAhOHVvzHoYkB8lqeZZh_wdMPpN9m_wr2JOMFGTYhUVRB04sxyOJl-lrXzU8gaQcHIRbKjenoW6qE2pmZ92S59LSYBRCj1OYS1LpBON5feFjn_LHeMh9Ht1Wljzf07xhpo9JAMc6h3GxRhIYf_ZwIamifOeQXDxe43PssJHvM8quxWpYYevlzj5t511zZsvNpaG0mN_CmExLUmyGk6CB0vhitfDsbjSdB9wfCzlg7eWjtxunGUFZgB0GwAZqOkAJbJIXiWv4Fr53AbQkVacyz427tM8gD7nG4q_WIvT8jDX-CVVGlKS7p7zpSxXLTVqW-kNCw-Gfk2xl6hG6FLHz2mRoWqoVw0abv6VtfZ3xLoT1x2tblNmMsamQeNmzREq9YbPgYr9ZKd0IwfayH895snKAgaRdcBJGS397X4UcvzzfbZWjZUrahvO5PG8B6op324mzu2MORdkWruKx6EAahnYAFUPMAHhWLJAVfhZDCppKzgW7PPsNBBl8PKbUpUKfluLX34bzkfAO8tHvPJIBs9mSqPL2xVUpmmthRe-JhAqjOlfuoTotA&isca=1",
            "https://ff465f4b2c54964a983a0c1f769ddb31d10b233ce0242bd8bf57dae-apidata.googleusercontent.com/download/storage/v1/b/dream-home-org/o/scandinavian_15.jpg?jk=AanfhSBMbCYPJ4DQzTwpM85jyzKISHTaeGqYG8QYJBCKCfOaU0pH0D0IopnxtDIgB153l0-JwDqjn_bzdHZSFjPvIUorzBpU3v7MaiYY77_AOvrRaS3jvQPOcNd9J3gaS6ScpCcO_fMvE7Al9sjyaG75aIDTxepeHJ7o8AyM2KmZ9Fcq3jdPuttC3wN5VFlxWmgtCaB4x1urmJcKdKIkOcDUm0l2ttrKB1piEedTQtIY0js4Eq7XjhmDuTo9kvct3Vven0oXLTc3Jj2mkdauXx4ImEmd68V1c1TtTT3G_OMkpSLKHnzwqAetbg-iQjdzvyPWfGPcj2lDduJXmfKzZ9XeXedVdNjYoLr0SL2jd3yTgZpYz6qMcen0GhCLXyVaCOUckVDP9vwkU8xtb0kqCkm7CQrkyu_H0sac0jMPZitAdaDWQQ-q4R3EvkKnSYTtF86dywU7sqdol-hlpSCBTF7bwOG0Or2CxGauNxePEFb6MPtHak9orK6iW9EmheA7OR2fs3xV_lOYVYOkP_fViw69Zv9zAe_KiFB1uYRyCaRFrhsAMpGVBtGFpJMQ69__ssaioiTA4oGkHdhck0MJP3MitWumKPJVkBYap_YAstYxM-aJpuIiMouIC4eU1veaZQrV9EskWuKg4NjzMGgzlsXIWbCdQAOzPLPDY_F-ywanTUE5U8mipyQeVhwHl66qXHsQHg695ywT4D285fo5KYkKqoIjL6CCHdGPJbB7azN1DVHtNc_nwUFjPJyftxKHB2MXgghEyPGGeJkt3LHpk-_Hi-cZr8N7qFGG660W0wfc5kUSOWBWm9N0a4AVjLwki6tTUnaxW3EMfsUqe9yTmAzyUoA_cHCwxmu9ydAx5BEDK_zLiYSUWCWEAgYkxHbNqsG8yJl4YUWdUtTD6sRVUk6NCXpSrNvZwvCL-SQqhRUXbhAv-eSLJRu9yuDEW3s-J0GmdiZmejlh4ym5t4oBAfcgrEKEHrtz5woCDD9oCukYhOxepXPcL9CsFBibFYQdge7zMEDwiLvALMpHbW6XjfRldlA7Af6t6T5iHaRtgn8IUVpm811SYHZB6Tz60TQGK9nq6KXBPZcsA6K9EA&isca=1",
          ],
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

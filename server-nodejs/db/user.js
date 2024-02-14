const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  getUserImageSave: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("user_save");
    const cursor = coll.find({ user_email: "kwonbetty@gmail.com" }).toArray();
    return cursor;
  },
  getImage: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("style_gallery");
    const cursor = coll
      .find({ _id: new ObjectId("65b56bea70b5a5f238939689") })
      .toArray();
    return cursor;
  },
  addUserSave: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("user_save");
    const entry = {
      user_email: "kwonbetty@gmail.com",
      image_id: new ObjectId("658643c0dcbefde032c01bb9"),
    };
    const cursor = await coll.insertOne(entry);
    return cursor;
  },
};

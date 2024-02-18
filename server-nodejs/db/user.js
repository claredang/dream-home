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
  getUserImageSave: async function (email) {
    const _db = client.db("homestay");
    const coll = _db.collection("user_save");
    const coll2 = _db.collection("style_gallery");
    const cursor = await coll.find({ user_email: email }).toArray();
    let result = [];

    for (let doc of cursor) {
      const imageId = doc.image_id;
      const imageCursor = await coll2.find({ _id: imageId }).toArray();
      result.push(imageCursor);
    }
    return result;
  },
  getImage: async function () {
    const _db = client.db("homestay");
    const coll = _db.collection("style_gallery");
    const cursor = coll
      .find({ _id: new ObjectId("65b56bea70b5a5f238939689") })
      .toArray();
    return cursor;
  },

  /// ========== Inspiration user_save collection ==========
  saveToBoard: async function (user, image_id) {
    const _db = client.db("homestay");
    const coll = _db.collection("user_save");
    const entry = {
      user_email: user,
      image_id: new ObjectId(image_id),
    };
    const cursor = await coll.insertOne(entry);
    return cursor;
  },

  unsaveFromBoard: async function (user, image_id) {
    const _db = client.db("homestay");
    const coll = _db.collection("user_save");
    const query = {
      $and: [{ user_email: user }, { image_id: new ObjectId(image_id) }],
    };
    const cursor = await coll.deleteMany(query);
    return cursor;
  },
};

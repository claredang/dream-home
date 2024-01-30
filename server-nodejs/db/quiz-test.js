const { MongoClient, ServerApiVersion } = require("mongodb");

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

  getQuizTestDb: function () {
    const _db = client.db("homestay");
    const coll = _db.collection("quiz-test");
    const cursor = coll.find({}).toArray();
    return cursor;
  },

  getStyleDescription: function () {
    const styleDescriptions = {
      farm_house:
        "The utilitarian beauty of raw materials and industrial aesthetics",
      glam: "You love the glitz and glamour. Your space is filled with luxurious fabrics, metallic accents, and bold statements.",
      industrial:
        "Raw and edgy defines your style. Exposed bricks, metal finishes, and a utilitarian vibe dominate your space.",
      midcentury_modern:
        "You're all about the retro charm. Clean lines, organic shapes, and a mix of materials give your space a timeless appeal.",
      coastal:
        "Peace, love, and patterns. Your love of vibrant colors, layered textures, and ornate embellishments create a whimsical lair with let-down-your-hair flair.",
      scandinavian:
        "Simplicity is your secret to a classic life. You love clean lines, plush fabrics, and handcrafted things. You get really excited about functional storage solutions and cozy pants on Sundays.",
      indochine:
        "Characterized by a harmonious fusion of French colonial elegance and Southeast Asian influences, featuring rich textures, natural materials, and a balanced blend of vintage and exotic elements.",
    };

    return styleDescriptions;
  },
};

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const trackModel = new schema({
  name: { type: String, min: 1, max: 40, unique: true },
  artist: { type: schema.Types.ObjectId, ref: "Artist" },
  lyrics: { type: String, min: 15 },
  // Flag if lyrics are not correct/are cover/etc.
  flags: [{ type: Boolean }],
});

module.exports = mongoose.model("Track", trackModel);

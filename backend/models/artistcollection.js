const mongoose = require("mongoose");
const schema = mongoose.Schema;

const artist = new schema({
  name: { type: String, minlength: 1, maxlength: 40, unique: true },
  tracks: [{ type: [schema.Types.ObjectId], ref: "Track" }],
});

module.exports = mongoose.model("Artist", artist);

const artist = require("../models/artistcollection");
const tracks = require("../models/trackSchema");
exports.getArtists = (req, res) => {
  artist
    .find({})
    .populate("tracks")
    .exec((err, results) => {
      if (err) {
        console.log("there was an error");
        res.send("error!");
      } else {
        console.log(results);
        res.send(results);
      }
    });
};

const mongoose = require("mongoose");
const url = require("./db");
const tracks = require("./models/trackSchema");
mongoose.connect(url);

tracks.count((err, res) => {
  console.log(res);
});

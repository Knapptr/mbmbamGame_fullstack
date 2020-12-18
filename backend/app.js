const express = require("express");
const app = express();

////////////////////////////////////////
// Port and DB
////////////////////////////////////////
const mongoose = require("mongoose");
const DBURL = require("./db");
const PORT = 3000;
//connect
mongoose.connect(DBURL, (err) => {
  if (err) {
    console.log("Error connecting to DB: " + err);
  } else {
    console.log("connected to database");
  }
});

////////////////////////////////////////
// Initial Middleware
////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("URL: " + req.url);
  next();
});

////////////////////////////////////////
// Routes
////////////////////////////////////////
const testRoute = require("./routes/test");
const lyricsRoute = require("./routes/lyrics");

app.use("/test", testRoute);
app.use("/lyrics", lyricsRoute);
app.use((err, req, res, next) => {
  console.log(err);
  res.send("Sorry. there was an error");
});
////////////////////////////////////////
// Listen on PORT
////////////////////////////////////////
app.listen(PORT, () => {
  console.log("listening on 3000");
});

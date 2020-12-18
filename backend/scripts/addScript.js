const Track = require("./models/trackSchema");
const Artist = require("./models/artistcollection");

const db = require("./db");
const mongoose = require("mongoose");
const artistcollection = require("./models/artistcollection");

mongoose.connect(db, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to DB");
  }
});

const newArtist = new Artist({
  name: "Test Artist",
});
newArtist.save((err, results) => {
  if (err) {
    console.log("error " + err);
  } else {
    console.log("SAVED");
    console.log(results);
    // add lyrics to artist

    artistcollection.find({ name: "Test Artist" }, (err, res) => {
      if (err) {
        console.log("error " + err);
      } else {
        console.log("found " + res);
        let foundArtist = res[0];

        console.log(foundArtist.name);
        console.log(foundArtist.tracks);
        console.log(foundArtist);
        let newTrack = new Track({
          name: "Song One",
          artist: foundArtist._id,
          lyrics: "These are words",
        });
        foundArtist.tracks.push(newTrack._id);
        newTrack.save((err, results) => {
          if (err) {
            console.log("error " + err);
          } else {
            console.log("saved track");
            foundArtist.save((err, results) => {
              if (err) {
                console.log("error " + err);
              } else {
                console.log("saved artist");
              }
            });
          }
        });
      }
    });
  }
});

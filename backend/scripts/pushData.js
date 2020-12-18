const mongoose = require("mongoose");
const { indexOf } = require("../db");
const connectionUrl = require("../db");

mongoose.connect(connectionUrl, () => {
  console.log("connected to DB");
});

const phishTracks = require("../dataToPush/Phish.json").data;
const dmbTracks = require("../dataToPush/Dave_Matthews_Band.json").data;

const Artist = require("../models/artistcollection");
const Track = require("../models/trackSchema");

let createArtists = async () => {
  const Phish = new Artist({
    name: "Phish",
  });
  await Phish.save((err, res) => {
    if (err) {
      console.log("there was an error.");
    } else {
      console.log("Saved: " + res);
      //create lyrics entries
      phishTracks.forEach((track) => {
        let newTrack = new Track({
          name: track.trackName,
          lyrics: track.lyrics,
          artist: res._id,
        });
        newTrack.save((err, trackRes) => {
          Artist.findById(res._id, (err, res) => {
            res.tracks.push(trackRes._id);
            res.save((err, res) => {
              if (err) {
                console.log("error");
              } else {
                console.log("Saved Track: " + trackRes.name);
              }
            });
          });
        });
      });
    }
  });
  const DMB = new Artist({
    name: "Dave Matthews Band",
  });

  await DMB.save((err, res) => {
    if (err) {
      console.log("there was an error.");
    } else {
      console.log("Saved: " + res);
      //create lyrics entries
      dmbTracks.forEach((track) => {
        let newTrack = new Track({
          name: track.trackName,
          lyrics: track.lyrics,
          artist: res._id,
        });
        newTrack.save((err, trackRes) => {
          Artist.findById(res._id, (err, res) => {
            res.tracks.push(trackRes._id);
            res.save((err, res) => {
              if (err) {
                console.log("error");
              } else {
                console.log("Saved Track: " + trackRes.name);
              }
            });
          });
        });
      });
    }
  });
};

//createArtists().then(() => console.log("All done!"));
// Commented out, because of a mongoDB write time limit. Below will add songs.

const continueAddingTracks = async (artistName, array) => {
  Artist.findOne({ name: artistName }, (err, artistResult) => {
    if (err) {
      console.log("error finding artist");
      process.exit();
    } else {
      array.forEach((track) => {
        Track.find({ name: track.trackName }).exec((error, result) => {
          if (error) {
            console.log("Error checking for duplicate track in DB");
            return;
          } else {
            let newTrack = new Track({
              name: track.trackName,
              artist: artistResult._id,
              lyrics: track.lyrics,
            });
            newTrack.save((trackError, trackResult) => {
              if (trackError) {
                console.log(
                  "error saving track. It probably already exists in the db"
                );
              } else {
                console.log("saved track: " + trackResult.name);
                Artist.findById(artistResult._id, (error, refetchArtist) => {
                  refetchArtist.tracks.push(trackResult._id);
                  refetchArtist.save((artistSaveErr, artistSaveRes) => {
                    if (artistSaveErr) {
                      console.log("error saving track to artist");
                      console.log(artistSaveErr);
                    } else {
                      console.log("saved track: " + trackResult.name);
                    }
                  });
                });
              }
            });
          }
        });
      });
    }
  });
};
// const Phish = new Artist({
//   name: "Phish",
// });
// Phish.save((err, res) => {
//   if (err) {
//     console.log("there was an error.");
//   } else {
//     console.log("Saved: " + res);
//   }
// });

// const DMB = new Artist({
//   name: "Dave Matthews Band",
// });
// DMB.save((err, res) => {
//   if (err) {
//     console.log("there was an error.");
//   } else {
//     console.log("Saved: " + res);
//   }
// });

continueAddingTracks("Phish", phishTracks).then(() => {
  console.log("Done adding Phish Tracks!");
});
continueAddingTracks("Dave Matthews Band", dmbTracks).then(() => {
  console.log("Done adding DMB Tracks!");
});

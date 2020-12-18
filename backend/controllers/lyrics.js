const tracks = require("../models/trackSchema");

exports.all = (req, res, next) => {
  tracks
    .find({})
    .populate("artist", "name")
    .exec((err, results) => {
      if (err) {
        console.log("error");
        res.redirect("/");
      } else {
        let filteredOutFlags = results.filter((el) => el.flags.length < 1);
        if (filteredOutFlags.length < 1) {
          res.send("no results found");
        } else {
          res.json(filteredOutFlags);
        }
      }
    });
};
exports.flag = (req, res, next) => {
  tracks.findById(req.params.id, (error, results) => {
    if (error) {
      return next(error);
    }
    results.flags.push(true);
    results.save((err, result) => {
      console.log("Flagged: " + result._id);
      res.send("flagged!");
    });
  });
};
exports.review = (req, res, next) => {
  tracks.find({}, (error, results) => {
    if (error) {
      return next(error);
    }
    let onlyFlagged = results.filter((el) => el.flags.length > 0);
    res.json(onlyFlagged);
  });
};
exports.specific = (req, res, next) => {
  tracks
    .findById(req.params.id)
    .populate("artist", "name")
    .exec((err, results) => {
      if (err) {
        return next(err);
      }
      if (results.length < 1) {
        res.send("no results found");
      } else {
        res.json(results);
      }
    });
};
exports.random = (req, res, next) => {
  tracks.countDocuments({}).exec((err, results) => {
    if (err) {
      console.log("error");
      res.send("error!");
    } else {
      tracks
        .find({})
        .populate("artist", "name")
        .exec({}, (err, results) => {
          if (err) {
            console.log(err);
            res.redirect("/");
          } else {
            if (results.length < 1) {
              res.send("no results available");
            } else {
              let flaggedFiltered = results.filter((el) => el.flags.length < 1);
              if (flaggedFiltered.length < 1) {
                res.send("Uh oh. All entries are flagged :(");
              } else {
                let randomSelection = Math.floor(
                  Math.random() * flaggedFiltered.length
                );
                res.json(flaggedFiltered[randomSelection]);
              }
            }
          }
        });
    }
  });
};

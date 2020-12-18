const express = require("express");
const router = express.Router();
const lyrics = require("../controllers/lyrics");
const cors = require('cors');

router.use("/random", cors())
router.get("/random", lyrics.random); // random wont return any flagged
router.get("/review", lyrics.review);
router.get("/:id", lyrics.specific);
router.post("/:id", lyrics.flag);
router.get("/", lyrics.all); //does not include flagged

module.exports = router;

/*!!! FIX ERROR HANDLING!!! */

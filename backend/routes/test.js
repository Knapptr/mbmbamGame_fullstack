const express = require("express");
const router = express.Router();

const artistControl = require("../controllers/test");

router.get("/", artistControl.getArtists);

module.exports = router;

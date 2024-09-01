const express = require("express");
const router = express.Router();
const VotingSystemController = require("../controllers/statsController");

router.get("/results", VotingSystemController.getStatss);

module.exports = router;

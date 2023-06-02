const router = require("express").Router();
const controller = require("../controllers/fetchLeaderboard");

router.get("/api/fetch-leaderboard", controller.fetchLeaderboard);

module.exports = router;

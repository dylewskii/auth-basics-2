const express = require("express");

const router = express.Router();

router.all("/ping", async (req, res, next) => {
  res.json({
    message: "ping ok",
  });
});

module.exports = router;

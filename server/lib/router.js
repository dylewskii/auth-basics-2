const express = require("express");

const router = express.Router();

// POST /register
router.post("/register", async (req, res, next) => {
  try {
    res.status(200).json({
      timestamp: Date.now(),
      msg: "Succesfully Registered",
      code: 200,
    });
  } catch (error) {}
});

module.exports = router;

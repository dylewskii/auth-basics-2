const express = require("express");

const router = express.Router();

// POST /register
router.post("/register", async (req, res) => {
  try {
    res.status(200).json({
      timestamp: Date.now(),
      msg: "Succesfully Registered",
      code: 200,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// POST /login
router.post("/login", async (req, res) => {
  try {
    res.status(200).json({
      timestamp: Date.now(),
      msg: "Logged-in Succesfully",
      code: 200,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// POST /logout
router.post("/logout", async (req, res) => {
  try {
    res.status(200).json({
      timestamp: Date.now(),
      msg: "Logged-out Succesfully",
      code: 200,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Catchall for Undefined Routes
router.all("*", async (req, res) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      msg: "Route Not Found",
      code: 404,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;

const express = require("express");
const User = require("../models/user");

const router = express.Router();

// POST /register
router.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = new User();

    user.setFirstName("First Test");
    user.setLastName("Last Test");
    user.setEmail("test@test.com");
    user.setPassword("password");

    let msg = false;
    msg = user.setFirstName(firstName);
    if (msg) {
      return res
        .status(400)
        .json({ error: { code: 400, type: "first name", message: msg } });
    }

    msg = user.setLastName(lastName);
    if (msg) {
      return res
        .status(400)
        .json({ error: { code: 400, type: "last name", message: msg } });
    }

    msg = user.setEmail(email);
    if (msg) {
      return res
        .status(400)
        .json({ error: { code: 400, type: "email", message: msg } });
    }

    msg = await user.setPassword(password);
    if (msg) {
      return res
        .status(400)
        .json({ error: { code: 400, type: "password", message: msg } });
    }

    console.log(user);

    res.status(200).json({
      timestamp: Date.now(),
      msg: "registered OK",
      code: 200,
      data: req.body,
      user,
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

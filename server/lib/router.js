const express = require("express");
const User = require("../models/user");
const passport = require("passport");
const { stat } = require("fs");
const DB = require("../lib/db");

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

router.post("/login", (req, res, next) => {
  console.log(`1 - Login handler ${JSON.stringify(req.body)}`);
  passport.authenticate("local", (err, user) => {
    console.log(`3 - Passport authenticate cb ${JSON.stringify(user)}`);
    if (err) {
      return res.status(401).json({
        timestamp: Date.now(),
        msg: "Access Denied. Username or Password Incorrect.",
        code: 401,
      });
    }

    if (!user) {
      return res.status(401).json({
        timestamp: Date.now(),
        msg: "Unauthorised user.",
        code: 401,
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({
        redirectTo: "/profile",
      });
    });
  })(req, res);
});

// GET /user
router.get("/user", async (res, req) => {
  try {
    if (!req.isAuthenticated())
      return res.status(403).json({
        timestamp: Date.now(),
        msg: "Access Denied",
        code: 403,
      });

    const user = DB.findOne(req.user?.id);

    if (!user)
      return res.status(404).json({
        msg: "User not found",
        code: 404,
      });

    res.sendStatus(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(new Error(error.message));
    res.status(500).json({
      timestamp: Date.now(),
      msg: "Failed to get user, internal server error",
      code: 500,
    });
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

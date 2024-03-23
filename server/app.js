const express = require("express");
const app = express();
const router = require("./lib/router");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// handle urlencoded data
app.use(express.urlencoded({ extended: true }));
// handle json data coming from requests mainly post
app.use(express.json());

const port = process.env.PORT || 3000;

let _ = {};

// Start http server on port 3000
_.start = () => {
  try {
    app.listen(port);
    console.log(`express listening on port: ${port}`);
  } catch (err) {
    throw new Error(err);
  }
};

app.use(passport.initialize());
passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log("2 - Local Strategy verify cb");
      // call db to verify user
      return done(null, { id: "test" });
    }
  )
);

app.use("/api", router);

_.start();

const express = require("express");
const app = express();
const router = require("./lib/router");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");

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

app.use(
  cookieSession({
    name: "app-auth",
    keys: ["secret-new", "secret-old"],
    maxAge: 60 * 60 * 24,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  console.log(`4 - Serialize user ${JSON.stringify(user)}`);
  return done(null, user.id);
});
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

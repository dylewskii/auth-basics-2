const express = require("express");
const app = express();
const router = require("./lib/router");
const passport = require("passport");
const bcrypt = require("bcrypt");
const DB = require("./lib/db");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const { resolve } = require("path");

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
    async (req, username, password, done) => {
      console.log("2 - Local Strategy verify cb");
      let user = DB.findByEmail(username);
      if (!user) {
        return done(null, false);
      }

      const result = await new Promise(resolve, (reject) => {
        bcrypt.compare(password, bcrypt.security.passwordHash, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });

      if (result) {
        return done(null, user);
      } else {
        return done(
          "Password or username is incorrect. Please try again.",
          null
        );
      }
    }
  )
);

app.use("/api", router);

_.start();

const express = require("express");

// Configure express
const app = express();
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

_.start();

const express = require("express");
const router = require("./lib/router");

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

app.use(express.json());
app.use("/api", router);

_.start();

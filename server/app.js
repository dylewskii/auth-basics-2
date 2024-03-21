const express = require("express");

// Configure express
const app = express();
const port = process.env.PORT || 3000;
const router = require("./lib/router");

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

// Default api route
app.get("/", (req, res, next) => {
  res.json({
    code: 200,
    message: "success",
  });
});

app.use("/api", router);

_.start();

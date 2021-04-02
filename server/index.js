const path = require("path");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// ROUTE IMPORTS

// ROUTES

// DATABASE AND SERVER CONNECTION
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

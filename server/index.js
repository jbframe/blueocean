const path = require("path");
const express = require("express");

const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static(path.join(__dirname, "/../pages")));

// ROUTE IMPORTS

// ROUTES

// DATABASE AND SERVER CONNECTION
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

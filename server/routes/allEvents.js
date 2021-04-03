const express = require("express");
const eventsRouter = express.Router();

eventsRouter.use(express.urlencoded({ extended: true }));

eventsRouter.get("/", (req, res) => {
  // DATABASE QUERY GOES HERE

  res.send("DATABASE QUERY RESULTS FOR ALL EVENTS");
});

module.exports = eventsRouter;

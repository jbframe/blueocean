const express = require("express");
const eventsRouter = express.Router();
const queries = require("../../database/queries");

eventsRouter.use(express.urlencoded({ extended: true }));

eventsRouter.get("/", (req, res) => {
  queries.getAllUpcomingEvents((err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

module.exports = eventsRouter;

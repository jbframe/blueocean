const express = require("express");
const eventsRouter = express.Router();
const queries = require("../../database/queries");

eventsRouter.use(express.urlencoded({ extended: true }));



// req.body = { name, location, date, hostId, meetingUrl, summary, max }
eventsRouter.get("/event/:id", (req, res) => {
  let eventId = req.params.id;
  queries.getAttendeesByEvent(eventId, (err, results) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.send(results);
    }
  })
})

module.exports = eventsRouter;

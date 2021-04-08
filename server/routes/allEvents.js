const express = require("express");
const eventsRouter = express.Router();
const queries = require("../../database/queries");

eventsRouter.use(express.urlencoded({ extended: true }));

eventsRouter.get("/", (req, res) => {
  queries.getAllUpcomingEvents((err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

// req.body = { name, location, date, hostId, meetingUrl, summary, max }
eventsRouter.post("/create", (req, res) => {
  let event = req.body
  queries.insertEvent(event, (err, results) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      if (event.photos) {
        queries.insertEventPhoto(results.rows[0].event_id, event.photos, (err, photoResults) => {
          if (err) {
            res.send(err)
          } else {
            results.photos = photoResults;
            res.send(results)
          }
        })
      } else {
        res.send(results);
      }
    }
  })
})


module.exports = eventsRouter;

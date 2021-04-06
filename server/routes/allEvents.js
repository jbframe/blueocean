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

// req.body.event = { name, location, date, hostId, meetingUrl, summary, max }
eventsRouter.post("/create", (req, res) => {
  let event = req.body.event
  queries.insertEvent(event, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  })
})

// req.body.questions = [
//   {
//     text: "Question text here?",
//     answers: [
//       {
//         text: "answer text here.",
//         correct: Boolean
//       },
//       {}, {}...
//     ]
//   },
//   {}, {}...
// ]
eventsRouter.Router.post("/assessment/:id", (req, res) => {
  queries.insertAssessment(req.params.id, req.body.questions, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  })
})
module.exports = eventsRouter;

const express = require("express");
const assessmentRouter = express.Router();
const queries = require("../../database/queries");

assessmentRouter.use(express.urlencoded({ extended: true }));

assessmentRouter.get("/:event_id", (req, res) => {
  queries.getAssessmentQuestionsByEvent(req.params.event_id, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  })
})

assessmentRouter.get("/answers/:question_id", (req, res) => {
    queries.getAnswersByQuestion(req.params.question_id, (err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.send(results);
      }
    })
})

// req.body = [
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
assessmentRouter.post("/:event_id", (req, res) => {
    queries.insertAssessment(req.params.event_id, req.body, (err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.send(results);
      }
    })
  })

module.exports = assessmentRouter;
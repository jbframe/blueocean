const express = require("express");
const signUpRouter = express.Router();
const queries = require("../../database/queries");

signUpRouter.use(express.json());

// { user_id, event_id }
signUpRouter.put("/", (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const event_id = parseInt(req.body.event_id);

  queries.makeUserAnAttendee(user_id, event_id, (err, results) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(results);
    }
  });
});

module.exports = signUpRouter;
